package tradecoinsales

import (
	"context"
	"fmt"
	"math/big"
	"sort"
	"strconv"
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
		tcAddr = common.HexToAddress(config.CompositionSalesContractAddress)
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
	common.HexToAddress(config.CompositionSalesContractAddress)
	caller, err := tradeCoin.NewTradeCoinCompositionCaller(common.HexToAddress(config.CompositionNFTContractAddress), client)
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

	f, err := tradeCoin.NewTradeCoinCompositionSalesFilterer(tcAddr, client)
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
func GetAllTradeCoin(ctx context.Context, f tradeCoin.TradeCoinCompositionSalesFilterer, start uint64, end uint64, eventChan chan []model.Event, wg *sync.WaitGroup) {
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
func GetAssets(ctx context.Context, f tradeCoin.TradeCoinCompositionSalesFilterer, start uint64, end uint64) ([]model.Event, error) {
	var (
		opts = &bind.FilterOpts{
			Start:   start,
			End:     &end,
			Context: ctx,
		}
		allEvents []model.Event
	)

	completeSaleEvents, _ := ListenFilterCompleteSaleEvent(f, opts)
	allEvents = append(allEvents, completeSaleEvents...)

	finishCommEvents, _ := ListenFilterFinishCommercialTxEvent(f, opts)
	allEvents = append(allEvents, finishCommEvents...)

	initCommEvents, _ := ListenFilterInitialCommercialTxEvent(f, opts)
	allEvents = append(allEvents, initCommEvents...)

	revSalesEvents, _ := ListenFilterReverseSaleEvent(f, opts)
	allEvents = append(allEvents, revSalesEvents...)

	servPayEvents, _ := ListenFilterServicePaymentEvent(f, opts)
	allEvents = append(allEvents, servPayEvents...)

	return allEvents, nil
}

func ListenFilterCompleteSaleEvent(f tradeCoin.TradeCoinCompositionSalesFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterCompleteSaleEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Complete Sales"
		event.EventDesc = "The sales is completed"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.Dochash
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
		events = append(events, event)
	}
	return events, nil
}
func ListenFilterFinishCommercialTxEvent(f tradeCoin.TradeCoinCompositionSalesFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterFinishCommercialTxEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Finish Commercial Transaction"
		event.EventDesc = "The commercial transaction is finished"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.Dochash
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
			FieldName:  "Seller",
			FieldValue: iter.Event.Seller.Hash().String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)
		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenFilterInitialCommercialTxEvent(f tradeCoin.TradeCoinCompositionSalesFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterInitiateCommercialTxEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Initialize Commercial Transaction"
		event.EventDesc = "The commercial transaction is initialized"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
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

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Buyer",
			FieldValue: iter.Event.Buyer.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Is Payed",
			FieldValue: strconv.FormatBool(iter.Event.IsPayed),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Pay In Fiat",
			FieldValue: strconv.FormatBool(iter.Event.PayInFiat),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Price in Wei",
			FieldValue: iter.Event.PriceInWei.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}
func ListenFilterReverseSaleEvent(f tradeCoin.TradeCoinCompositionSalesFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterReverseSaleEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Reverse Sale"
		event.EventDesc = "The sale of the product is reversed"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		//event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller
		event.RootHash = iter.Event.RootHash

		//EventDocument - dochash and doctype
		docHashesBytes := iter.Event.Dochash
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
func ListenFilterServicePaymentEvent(f tradeCoin.TradeCoinCompositionSalesFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterServicePaymentEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Service Payment"
		event.EventDesc = "The service payment is made"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()

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
			FieldName:  "Receiver",
			FieldValue: iter.Event.Receiver.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Sender",
			FieldValue: iter.Event.Sender.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Pay In Fiat",
			FieldValue: strconv.FormatBool(iter.Event.PayInFiat),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Payment in Wei",
			FieldValue: iter.Event.PaymentInWei.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
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
	tradeCoinComp, err := caller.TradeCoinComposition(opts, stringToInt(event.TokenId))
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
	//product.Commodity = tradeCoin.Product

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
func TrimRightZeroes(s []byte) []byte {
	idx := len(s)
	for ; idx > 0; idx-- {
		if s[idx-1] != 0 {
			break
		}
	}
	return s[:idx]
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
	f, err := tradeCoin.NewTradeCoinCompositionSalesFilterer(addr, client)
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
		Pending: false,
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
