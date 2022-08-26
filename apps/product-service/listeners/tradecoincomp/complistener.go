package tradecoincomp

import (
	"context"
	"fmt"
	"math/big"
	"sort"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/config"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/database"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/sirupsen/logrus"
	log "github.com/sirupsen/logrus"

	tradeCoin "github.com/BlocklabNL/TradeCoin/pkg/tokenization"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

var (
	updateCacheInterval = 15 * time.Second
	cacheWarmedUp       int32
)

func StartCache(ctx context.Context, doWarmUp bool) {
	defer routineStopped(ctx)

	var (
		err    error
		tcAddr = common.HexToAddress(config.CompositionNFTContractAddress)
		end    = warmupCache(ctx, tcAddr, doWarmUp)
	)

	atomic.StoreInt32(&cacheWarmedUp, 1)

	// update cache periodically for new blocks
	for {
		select {
		case <-ctx.Done():
			return
		case <-time.NewTimer(updateCacheInterval).C:
			end, err = updateCache(ctx, tcAddr, end)
			if err != nil {
				log.WithError(err).Info("could not update cache")
			}
		}
	}
}

// blockRange returns the [start,end] blockrange to search for.
func blockRange(ctx context.Context, client *ethclient.Client, tcAddr common.Address) (*big.Int, *big.Int, error) {
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	// contract deployed
	caller, err := tradeCoin.NewTradeCoinCompositionCaller(tcAddr, client)
	if err != nil {
		return nil, nil, err
	}

	start, err := caller.DeployedOn(nil)
	if err != nil {
		return nil, nil, err
	}

	// chain head
	head, err := client.HeaderByNumber(ctx, nil)
	if err != nil {
		return nil, nil, err
	}

	return start, head.Number, nil
}
func warmupCache(ctx context.Context, tcAddr common.Address, doWarmUp bool) *big.Int {

	client, err := ethclient.DialContext(ctx, config.EthereumNodeDefault)
	if err != nil {
		logrus.WithError(err).Fatal("could not connect to ethereum node")
	}
	defer client.Close()

	start, end, err := blockRange(ctx, client, tcAddr)

	if err != nil {
		logrus.WithError(err).Fatal("could not determine block range")
	}

	logrus.WithFields(logrus.Fields{
		"start": start,
		"end":   end,
	}).Info("warmup cache...")

	begin := time.Now()

	f, err := tradeCoin.NewTradeCoinCompositionFilterer(tcAddr, client)
	if err != nil {
		logrus.WithError(err).Fatal("could not instantiate tradeCoin filter")
	}

	var (
		allEvents  []model.Event
		wg         sync.WaitGroup
		eventsChan = make(chan []model.Event)
	)

	// These are linked in the function GetAllTradeCoin and GetAssets
	go func() {
		wg.Add(1)
		go GetAllTradeCoin(ctx, *f, start.Uint64(), end.Uint64(), eventsChan, &wg)
		wg.Wait()
		close(eventsChan)
	}()
	for newEvents := range eventsChan {
		allEvents = append(allEvents, newEvents...)
	}

	sortEvents(allEvents)

	caller, _ := tradeCoin.NewTradeCoinCompositionCaller(tcAddr, client)
	opts := &bind.CallOpts{
		Pending: false,
		Context: ctx,
	}

	//Create Event to DB, includes callback updates
	if doWarmUp {
		for _, event := range allEvents {
			CreateEvent(event, caller, opts)
		}
	}

	elapsed := time.Now().Sub(begin)
	logrus.WithFields(logrus.Fields{
		"took":            elapsed,
		"tradeCoinEvents": len(allEvents),
	}).Infof("cache warmed up")

	return new(big.Int).Add(end, big.NewInt(1))
}

// GetAllAssets returns all LinkedAssets.
func GetAllTradeCoin(ctx context.Context, f tradeCoin.TradeCoinCompositionFilterer, start uint64, end uint64, eventChan chan []model.Event, wg *sync.WaitGroup) {
	defer wg.Done()
	newEvents, err := GetAssets(ctx, f, start, end)
	eventChan <- newEvents
	if err != nil {
		logrus.Infof("Failed to get assets for block range %d to %d", start, end)
		if (end - start) > 1000 {
			wg.Add(2)
			go GetAllTradeCoin(ctx, f, start, start+(end-start)/2, eventChan, wg)
			go GetAllTradeCoin(ctx, f, start+(end-start)/2, end, eventChan, wg)
		}
	} else {
		logrus.Infof("Successfully got %d assets for block range %d to %d", len(newEvents), start, end)
	}
}

// GetAssets retrieves AssetLinked events from ethereum node and returns them as []model.Event
func GetAssets(ctx context.Context, f tradeCoin.TradeCoinCompositionFilterer, start uint64, end uint64) ([]model.Event, error) {
	var (
		opts = &bind.FilterOpts{
			Start:   start,
			End:     &end,
			Context: ctx,
		}
		allEvents []model.Event
	)

	tarnsferEvnts, _ := ListenTransferEvent(f, opts)
	allEvents = append(allEvents, tarnsferEvnts...)

	transEvents, _ := ListenAddTransformationEvent(f, opts)
	allEvents = append(allEvents, transEvents...)

	stateHandlerEvents, _ := ListenChangeStateAndHandlerEvent(f, opts)
	allEvents = append(allEvents, stateHandlerEvents...)

	addInfoEvnts, _ := ListenAddInformationEvent(f, opts)
	allEvents = append(allEvents, addInfoEvnts...)

	burnEvents, _ := ListenBurnEvent(f, opts)
	allEvents = append(allEvents, burnEvents...)

	unitConvEvents, _ := ListenUnitConversionEvent(f, opts)
	allEvents = append(allEvents, unitConvEvents...)

	createCompEcents, _ := ListenFilterCreateCompositionEvent(f, opts)
	allEvents = append(allEvents, createCompEcents...)

	decompEvents, _ := ListenFilterDecompositionEvent(f, opts)
	allEvents = append(allEvents, decompEvents...)

	appendCompEvents, _ := ListenFilterAppendProductToCompositionEvent(f, opts)
	allEvents = append(allEvents, appendCompEvents...)

	appendDecompEvents, _ := ListenFilterRemoveProductFromCompositionEvent(f, opts)
	allEvents = append(allEvents, appendDecompEvents...)

	return allEvents, nil
}

//Entry Events
func ListenFilterCreateCompositionEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterCreateCompositionEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Create Composition"
		event.EventDesc = "The composition is created"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.DocHash
		var eventDocs []model.EventDocument
		for _, dochash := range docHashesBytes {
			eventDocs = append(eventDocs, model.EventDocument{DocumentHash: common.BytesToHash(dochash[:])})
		}
		docTypeBytes := iter.Event.DocType
		for i, doctype := range docTypeBytes {
			eventDoc := eventDocs[i]
			eventDoc.DocumentType = string(doctype[:])
		}

		var dynamicFields []model.DynamicField

		intTokenIds := iter.Event.ProductIds
		var tokenIds []string
		for _, tokenid := range intTokenIds {
			tokenIds = append(tokenIds, tokenid.String())
		}
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Product Ids",
			FieldValue: strings.Join(tokenIds[:], ","),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = 0
		events = append(events, event)
	}
	return events, nil
}

//Middle transaction events
func ListenTransferEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterTransfer(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {
		//create event object and store in
		var event model.Event
		event.EventName = "Transfer"
		event.EventDesc = "Token is transferred"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "From",
			FieldValue: iter.Event.From.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "To",
			FieldValue: iter.Event.To.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenAddTransformationEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterAddTransformationEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Add Transformation"
		event.EventDesc = "The transformation is added to the token"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.DocHash
		var eventDocs []model.EventDocument
		for _, dochash := range docHashesBytes {
			eventDocs = append(eventDocs, model.EventDocument{DocumentHash: common.BytesToHash(dochash[:])})
		}
		docTypeBytes := iter.Event.DocType
		for i, doctype := range docTypeBytes {
			eventDoc := eventDocs[i]
			eventDoc.DocumentType = string(doctype[:])
		}

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Weight Loss",
			FieldValue: iter.Event.WeightLoss.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Transformation Code",
			FieldValue: iter.Event.TransformationCode,
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenChangeStateAndHandlerEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterChangeStateAndHandlerEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Change State/Handler"
		event.EventDesc = "The token state and/or handler is changed"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.DocHash
		var eventDocs []model.EventDocument
		for _, dochash := range docHashesBytes {
			eventDocs = append(eventDocs, model.EventDocument{DocumentHash: common.BytesToHash(dochash[:])})
		}
		docTypeBytes := iter.Event.DocType
		for i, doctype := range docTypeBytes {
			eventDoc := eventDocs[i]
			eventDoc.DocumentType = string(doctype[:])
		}

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "New State",
			FieldValue: string(iter.Event.NewState),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "New Handler",
			FieldValue: iter.Event.NewCurrentHandler.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenAddInformationEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterAddInformationEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Add Information"
		event.EventDesc = "Information is added to the token"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.DocHash
		var eventDocs []model.EventDocument
		for _, dochash := range docHashesBytes {
			eventDocs = append(eventDocs, model.EventDocument{DocumentHash: common.BytesToHash(dochash[:])})
		}
		docTypeBytes := iter.Event.DocType
		for i, doctype := range docTypeBytes {
			eventDoc := eventDocs[i]
			eventDoc.DocumentType = string(TrimRightZeroes(doctype[:]))
			eventDocs[i] = eventDoc
		}
		event.EventDocuments = eventDocs

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}
func ListenUnitConversionEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterUnitConversionEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Unit Conversion"
		event.EventDesc = "The unit conversion is made"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "New Unit",
			FieldValue: string(common.TrimRightZeroes(iter.Event.NewAmountUnit[:])),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Previous Unit",
			FieldValue: string(common.TrimRightZeroes(iter.Event.PreviousAmountUnit[:])),
		})
		// Calculate Float amount from Big Int to float32
		floatAmount := (new(big.Float).SetInt(iter.Event.Amount))
		var divider float64
		divider = 1000
		t, _ := floatAmount.Float64()

		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Amount",
			FieldValue: strconv.FormatFloat((t / divider), 'f', -1, 32),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}
func ListenFilterAppendProductToCompositionEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterAppendProductToCompositionEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Add Product to Composition"
		event.EventDesc = "Product is added to composition"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Product Id",
			FieldValue: iter.Event.TokenIdOfProduct.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenFilterRemoveProductFromCompositionEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterRemoveProductFromCompositionEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Remove Product From Composition"
		event.EventDesc = "Product is removed from from composition"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Product Id",
			FieldValue: iter.Event.TokenIdOfProduct.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}

//Exist Events
func ListenFilterDecompositionEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterDecompositionEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Create Decomposition"
		event.EventDesc = "The product is decomposed"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.DocHash
		var eventDocs []model.EventDocument
		for _, dochash := range docHashesBytes {
			eventDocs = append(eventDocs, model.EventDocument{DocumentHash: common.BytesToHash(dochash[:])})
		}
		docTypeBytes := iter.Event.DocType
		for i, doctype := range docTypeBytes {
			eventDoc := eventDocs[i]
			eventDoc.DocumentType = string(doctype[:])
		}

		var dynamicFields []model.DynamicField

		intTokenIds := iter.Event.ProductIds
		var tokenIds []string
		for _, tokenid := range intTokenIds {
			tokenIds = append(tokenIds, tokenid.String())
		}
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Product Ids",
			FieldValue: strings.Join(tokenIds[:], ","),
		})
		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenBurnEvent(f tradeCoin.TradeCoinCompositionFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterBurnEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Product Exit"
		event.EventDesc = "The product token is exited from the system."
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.DocHash
		var eventDocs []model.EventDocument
		for _, dochash := range docHashesBytes {
			eventDocs = append(eventDocs, model.EventDocument{DocumentHash: common.BytesToHash(dochash[:])})
		}
		docTypeBytes := iter.Event.DocType
		for i, doctype := range docTypeBytes {
			eventDoc := eventDocs[i]
			eventDoc.DocumentType = string(doctype[:])
		}
		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)
	}
	return childs, nil
}

func TrimRightZeroes(s []byte) []byte {
	idx := len(s)
	for ; idx > 0; idx-- {
		if s[idx-1] != 0 {
			break
		}
	}
	return s[:idx]
}

func stringToInt(input string) *big.Int {
	n := new(big.Int)
	n, ok := n.SetString(input, 10)
	if !ok {
		fmt.Println("SetString: error")
		return nil
	}
	return n
}

//Create event to product DB
func CreateEvent(event model.Event, caller *tradeCoin.TradeCoinCompositionCaller, opts *bind.CallOpts) {
	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()
	var (
		product model.Product
	)
	//Find Product By TokenId
	if err := db.Preload("Events").First(&product, "tokenid = ? AND tokenname = ?", event.TokenId, "CPNFT").Error; err != nil {
	}

	product.Tokenname = "CPNFT"
	product.Tokenid = event.TokenId
	if event.EventName == "Create Decomposition" || event.EventName == "Product Exit" {
		product.Status = "exit"
	} else if event.EventName == "Transfer" {
		//do nothing
	} else {
		tradeCoinComp, err := caller.TradeCoinComposition(opts, stringToInt(event.TokenId))
		logrus.Println("---------------------")
		logrus.Println(tradeCoinComp)
		if err != nil {
			logrus.WithError(err).Error("Could not find the Token")
			return
		}
		ownerAddress, err := caller.OwnerOf(opts, stringToInt(event.TokenId))
		if err != nil {
			logrus.WithError(err).Error("Could not find Owner for the Token")
		}
		tranLength, _ := caller.GetTransformationsLength(opts, stringToInt(event.TokenId))
		var transArray []string
		var i int64
		for i = 0; i < tranLength.Int64(); i++ {
			tarnsform, _ := caller.GetTransformationsbyIndex(opts, stringToInt(event.TokenId), big.NewInt(i))
			transArray = append(transArray, tarnsform)
		}
		product.Status = "active"
		product.State = strconv.Itoa(int(tradeCoinComp.State))
		product.Handler = tradeCoinComp.CurrentHandler
		product.Owner = ownerAddress
		product.Amount = (new(big.Int).Div(tradeCoinComp.Amount, big.NewInt(1000))).String()
		product.Unit = string(tradeCoinComp.Unit[:])
		product.Trans = transArray
		//TODO
		product.Commodity = tradeCoinComp.Composition
	}

	//Create Dynamic Fields
	logrus.Println(event.DynamicFields)
	for _, dynamicField := range event.DynamicFields {
		if err := db.Create(&dynamicField).Error; err != nil {
			logrus.Println(err)
		}
	}

	//Create EventDocuments
	logrus.Println(event.EventDocuments)
	for _, eventDocument := range event.EventDocuments {
		if err := db.Create(&eventDocument).Error; err != nil {
			logrus.Println(err)
		}
	}

	//Create Event
	if err := db.Create(&event).Error; err != nil {
		logrus.Println(err)
	}

	//link event to Product
	product.Events = append(product.Events, event)
	if err := db.Save(&product).Error; err != nil {
		logrus.Println(err)
		return
	}
	db.Commit()
}

func updateCache(ctx context.Context, addr common.Address, start *big.Int) (*big.Int, error) {
	client, err := ethclient.DialContext(ctx, config.EthereumNodeDefault)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	// chain head
	head, err := client.HeaderByNumber(ctx, nil)
	if err != nil {
		return nil, err
	}

	if head.Number.Cmp(start) < 0 {
		logrus.Infof("no new blocks start: %d, head: %d", start, head.Number)
		return start, nil
	}

	// fetch all new tradeCoin start events between the start end latest block
	f, err := tradeCoin.NewTradeCoinCompositionFilterer(addr, client)
	if err != nil {
		logrus.WithError(err).Fatal("could not instantiate tradeCoin filter")
	}

	e := head.Number.Uint64()

	// Example of A filter
	allEvents, err := GetAssets(ctx, *f, start.Uint64(), e)
	sortEvents(allEvents)
	log.Infof("%d asset added to the cache", len(allEvents))

	//Create Event to DB, includes callback updates

	caller, _ := tradeCoin.NewTradeCoinCompositionCaller(addr, client)
	opts := &bind.CallOpts{
		Pending: true,
		Context: ctx,
	}

	for _, event := range allEvents {
		CreateEvent(event, caller, opts)
	}

	nextBlock := new(big.Int).Add(head.Number, big.NewInt(1))
	return nextBlock, nil
}

func sortEvents(events []model.Event) {
	sort.Slice(events, func(i, j int) bool {
		if events[i].BlockNumber < events[j].BlockNumber {
			return true
		}
		if events[i].BlockNumber > events[j].BlockNumber {
			return false
		}
		return events[i].TranIndex < events[j].TranIndex
	})
}

func routineStopped(ctx context.Context) {
	ctx.Value(wgKey{}).(*sync.WaitGroup).Done()
}

type wgKey struct{}
