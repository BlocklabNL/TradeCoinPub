package tradecoin

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
	tradeCoin "github.com/BlocklabNL/TradeCoin/pkg/tokenization"
	"github.com/jinzhu/gorm"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	log "github.com/sirupsen/logrus"

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
		tcAddr = common.HexToAddress(config.ProductNFTContractAddress)
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
	caller, err := tradeCoin.NewTradeCoinCaller(tcAddr, client)
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

	f, err := tradeCoin.NewTradeCoinFilterer(tcAddr, client)
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

	caller, _ := tradeCoin.NewTradeCoinCaller(tcAddr, client)
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
func GetAllTradeCoin(ctx context.Context, f tradeCoin.TradeCoinFilterer, start uint64, end uint64, eventChan chan []model.Event, wg *sync.WaitGroup) {
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
func GetAssets(ctx context.Context, f tradeCoin.TradeCoinFilterer, start uint64, end uint64) ([]model.Event, error) {
	var (
		opts = &bind.FilterOpts{
			Start:   start,
			End:     &end,
			Context: ctx,
		}
		allEvents []model.Event
	)

	//NddeCallBack?-Yes
	initTokenEvnts, _ := ListenInitialTokenizationEvent(f, opts)
	allEvents = append(allEvents, initTokenEvnts...)

	//No callback - nothing changes
	initCommTranEvents, _ := ListenInitiateCommercialTxEvent(f, opts)
	allEvents = append(allEvents, initCommTranEvents...)

	finishCommTranEvnts, _ := ListenFinishCommercialTxEvent(f, opts)
	allEvents = append(allEvents, finishCommTranEvnts...)

	apprTokenEvnts, _ := ListenApproveTokenizationEvent(f, opts)
	allEvents = append(allEvents, apprTokenEvnts...)

	//NddeCallBack?-Yes
	tarnsferEvnts, _ := ListenFilterTransferEvent(f, opts)
	allEvents = append(allEvents, tarnsferEvnts...)

	//NddeCallBack?-Yes
	transEvents, _ := ListenFilterAddTransformationEvent(f, opts)
	allEvents = append(allEvents, transEvents...)

	//NddeCallBack?-Yes
	stateHandlerEvents, _ := ListenChangeStateAndHandlerEvent(f, opts)
	allEvents = append(allEvents, stateHandlerEvents...)

	//NddeCallBack?-Yes
	batchEvents, _ := ListenBatchProductEvent(f, opts)
	allEvents = append(allEvents, batchEvents...)

	//NddeCallBack?-Yes
	splitEvents, _ := ListenSplitProductEvent(f, opts)
	allEvents = append(allEvents, splitEvents...)

	addInfoEvnts, _ := ListenAddInformationEvent(f, opts)
	allEvents = append(allEvents, addInfoEvnts...)

	//TODO - find a way to link the service payment to token id
	sevPayEvents, _ := ListenServicePaymentEvent(f, opts)
	allEvents = append(allEvents, sevPayEvents...)

	//NddeCallBack?-Yes
	mintSplitOrBatchEvnts, _ := ListenMintAfterSplitOrBatchEvent(f, opts)
	allEvents = append(allEvents, mintSplitOrBatchEvnts...)

	//NddeCallBack?-Yes
	burnEvents, _ := ListenBurnEvent(f, opts)
	allEvents = append(allEvents, burnEvents...)

	unitConvEvents, _ := ListenUnitConversionEvent(f, opts)
	allEvents = append(allEvents, unitConvEvents...)

	return allEvents, nil
}

//Add Prodcut Events

func ListenInitialTokenizationEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterInitialTokenizationEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()
	for iter.Next() {
		//create event object and store in
		var event model.Event
		event.EventName = "Initial Tokenization"
		event.EventDesc = "The token is initialized"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		event.GeoLocation = iter.Event.GeoLocation
		event.CreatorHash = iter.Event.FunctionCaller

		//TODO - Workaround because the TransferEvent also gets the same Index, needs to be fixed in sortinglogic
		event.TranIndex = 0
		events = append(events, event)
	}
	return events, nil
}

func ListenMintAfterSplitOrBatchEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterMintAfterSplitOrBatchEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "New Token After Split or Batch"
		event.EventDesc = "The new token(s) cerated after a split or batch"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		event.CreatorHash = iter.Event.FunctionCaller

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}

//Middle transaction events

func ListenApproveTokenizationEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterApproveTokenizationEvent(opts, nil, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {
		//create event object and store in
		var event model.Event
		event.EventName = "Approve Tokenization"
		event.EventDesc = "The tokenization is approved by the counter party"
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
			eventDoc.DocumentType = string(doctype[:])
		}

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Seller",
			FieldValue: iter.Event.Seller.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}

func ListenFilterTransferEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
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

func ListenFilterAddTransformationEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
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

func ListenChangeStateAndHandlerEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterChangeStateAndHandlerEvent(opts, nil, nil)
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

		//TODO - state
		var statusArray [12]string
		statusArray[0] = "PendingCreation" // Assign a value to the first element
		statusArray[1] = "Created"         // Assign a value to the second element
		statusArray[2] = "RoadTransport"
		statusArray[3] = "SeaTransport"
		statusArray[4] = "RailTransport"
		statusArray[5] = "AirTransport"
		statusArray[6] = "Storage"
		statusArray[7] = "Inspection"
		statusArray[8] = "Processing"
		statusArray[9] = "Locked"
		statusArray[10] = "Burned"
		statusArray[11] = "EOL"

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "New State",
			FieldValue: statusArray[iter.Event.NewState],
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

func ListenAddInformationEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterAddInformationEvent(opts, nil, nil)
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
			eventDoc.DocumentType = string(common.TrimRightZeroes(doctype[:]))
			eventDocs[i] = eventDoc
		}
		event.EventDocuments = eventDocs

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}

func ListenFinishCommercialTxEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
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
		event.EventDesc = "The commercial transaction is finished."
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
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
			FieldValue: iter.Event.Seller.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}

func ListenInitiateCommercialTxEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
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
		event.EventName = "Initiate Commercial Transaction"
		event.EventDesc = "The commercial transaction is initiated"
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
			eventDoc.DocumentType = string(doctype[:])
		}

		var dynamicFields []model.DynamicField
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Buyer",
			FieldValue: iter.Event.Buyer.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Price In Fiat",
			FieldValue: strconv.FormatBool(iter.Event.PayInFiat),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}

func ListenServicePaymentEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
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
		event.EventDesc = "Service payment is made"
		event.TokenId = iter.Event.TokenId.String()
		event.TransactionHash = iter.Event.Raw.TxHash
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
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
			FieldName:  "Receiver",
			FieldValue: iter.Event.Receiver.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Sender",
			FieldValue: iter.Event.Sender.String(),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Pay in fiat",
			FieldValue: strconv.FormatBool(iter.Event.PayInFiat),
		})
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Payment in wei",
			FieldValue: iter.Event.PaymentInWei.String(),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}

func ListenUnitConversionEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
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

//Exit Events
func ListenBatchProductEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		events []model.Event
	)
	iter, err := f.FilterBatchProductEvent(opts, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Product Batch"
		event.EventDesc = "Tokens are batched into one token"
		event.TransactionHash = iter.Event.Raw.TxHash
		//event.TokenId = iter.Event.TokenId
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		event.CreatorHash = iter.Event.FunctionCaller

		var dynamicFields []model.DynamicField
		intTokenIds := iter.Event.NotIndexedTokenIds

		tokenId := iter.Event.NotIndexedTokenIds[len(iter.Event.NotIndexedTokenIds)-1]
		event.TokenId = tokenId.String()

		var tokenIds []string
		for _, tokenid := range intTokenIds {
			tokenIds = append(tokenIds, tokenid.String())
		}
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Token Ids",
			FieldValue: strings.Join(tokenIds[:], ","),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)

		event.TranIndex = iter.Event.Raw.TxIndex
		events = append(events, event)
	}
	return events, nil
}
func ListenSplitProductEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterSplitProductEvent(opts, nil, nil)
	if err != nil {
		return nil, err
	}
	defer iter.Close()

	for iter.Next() {

		//create event object and store in
		var event model.Event
		event.EventName = "Product Split"
		event.EventDesc = "The product is splitted into new tokens"
		event.TransactionHash = iter.Event.Raw.TxHash
		event.TokenId = iter.Event.TokenId.String()
		event.BlockNumber = iter.Event.Raw.BlockNumber
		event.BlockHash = iter.Event.Raw.BlockHash
		event.ContractAddress = iter.Event.Raw.Address.Hash()
		event.CreatorHash = iter.Event.FunctionCaller

		var dynamicFields []model.DynamicField
		intTokenIds := iter.Event.NotIndexedTokenIds
		var tokenIds []string
		for _, tokenid := range intTokenIds {
			tokenIds = append(tokenIds, tokenid.String())
		}
		dynamicFields = append(dynamicFields, model.DynamicField{
			FieldName:  "Token Ids",
			FieldValue: strings.Join(tokenIds[:], ","),
		})
		event.DynamicFields = append(event.DynamicFields, dynamicFields...)
		event.TranIndex = iter.Event.Raw.TxIndex
		childs = append(childs, event)

	}
	return childs, nil
}
func ListenBurnEvent(f tradeCoin.TradeCoinFilterer, opts *bind.FilterOpts) ([]model.Event, error) {
	var (
		childs []model.Event
	)
	iter, err := f.FilterBurnEvent(opts, nil, nil)
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
func CreateEvent(event model.Event, caller *tradeCoin.TradeCoinCaller, opts *bind.CallOpts) {
	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()
	var (
		product model.Product
	)
	//Find Product By TokenId
	if err := db.Preload("Events").First(&product, "tokenid = ? AND tokenname = ?", event.TokenId, "PNFT").Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if event.EventName == "Initial Tokenization" {
				db.Preload("Events").First(&product, "last_tran_hash = ?", event.TransactionHash)
			}
		} else {
			logrus.WithError(err)
		}
	}

	//Update Product Info - for each event
	product.Tokenname = "PNFT"
	product.Tokenid = event.TokenId
	if event.EventName == "Product Split" || event.EventName == "Product Batch" || event.EventName == "Product Exit" {
		product.Status = "exit"
	} else if event.EventName == "Transfer" {
		//do nothing
	} else {
		tradeCoin, err := caller.TradeCoin(opts, stringToInt(event.TokenId))
		logrus.Println("-----------------tradeCoin", tradeCoin, err)
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
		product.State = strconv.Itoa(int(tradeCoin.State))
		product.Handler = tradeCoin.CurrentHandler
		product.Owner = ownerAddress
		product.Trans = transArray

		// Calculate Float amount from Big Int to float32
		floatAmount := (new(big.Float).SetInt(tradeCoin.Amount))
		var divider float64
		divider = 1000
		t, _ := floatAmount.Float64()

		product.Amount = strconv.FormatFloat((t / divider), 'f', -1, 32)
		product.Commodity = tradeCoin.Product
		product.Unit = string(common.TrimRightZeroes(tradeCoin.Unit[:]))
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
	f, err := tradeCoin.NewTradeCoinFilterer(addr, client)
	if err != nil {
		logrus.WithError(err).Fatal("could not instantiate tradeCoin filter")
	}

	e := head.Number.Uint64()

	// Example of A filter
	allEvents, err := GetAssets(ctx, *f, start.Uint64(), e)
	sortEvents(allEvents)
	log.Infof("%d asset added to the cache", len(allEvents))

	//Create Event to DB, includes callback updates

	caller, _ := tradeCoin.NewTradeCoinCaller(addr, client)
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
