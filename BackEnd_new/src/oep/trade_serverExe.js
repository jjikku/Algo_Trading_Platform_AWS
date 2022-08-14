var XTSInteractive = require('xts-interactive-api').Interactive;
var XTSInteractiveWS = require('xts-interactive-api').WS;
var config = require('./config.json');

let secretKey = config.secretKey;
let appKey = config.appKey;
let source = config.source;
let url = config.url;
let userID = null;

//xtsInteractive for API calls and xtsInteractiveWS for events related functionality
var xtsInteractive = null;
var xtsInteractiveWS = null;

async function executetrade(instrumentID, quantity, buy_sell) {

        //creating the instance of XTSRest
        xtsInteractive = new XTSInteractive(url);
        //calling the logIn API
        var loginRequest = {secretKey,appKey,source,};
        let logIn = await xtsInteractive.logIn(loginRequest);
        // checking for valid loginRequest
        if (logIn && logIn.type == xtsInteractive.responseTypes.success) {
            //creating the instance of XTSInteractiveWS
            xtsInteractiveWS = new XTSInteractiveWS(url);
            userID = logIn.result.userID;
            //Instantiating the socket instance
            // Token Generated after successful LogIn
            var socketInitRequest = {userID: logIn.result.userID,token: logIn.result.token,};
            xtsInteractiveWS.init(socketInitRequest);
            //calling the remaining methods of the Interactive API
            var abeesg = [
                {buysell: 'SELL', orderquantity: 250,instrumentId: '42489'},
                {buysell: 'SELL', orderquantity: 250,instrumentId: '42485'},
                {buysell: 'SELL', orderquantity: 250,instrumentId: '42488'},
                {buysell: 'SELL', orderquantity: 250,instrumentId: '42492'},
                {buysell: 'BUY',  orderquantity: 250,instrumentId: '42489'},
                {buysell: 'BUY',  orderquantity: 250,instrumentId: '42485'},
                {buysell: 'BUY',  orderquantity: 250,instrumentId: '42488'},
                {buysell: 'BUY',  orderquantity: 250,instrumentId: '42492'}
            ]
            for(i=0;i<abeesg.length;i++)
            {
                instrumentId = abeesg[i].instrumentId;
                orderquantity = abeesg[i].orderquantity;
                buysell = abeesg[i].buysell;
                let orderno =   executeTradeAPI(instrumentId, orderquantity, buysell);
                orderno.then(data => {
                    console.log(data.message, data.exchangeInstrumentID, data.buy_sell, data.executionPrice, data.apporderNo, data.data);
                });
            }
                        
            //let executedorder = executeTradeAPI(instrumentID,quantity, buy_sell);


            //return executedorder;

        } else {
            //In case of failure
            console.error(logIn);
        }
    }

    async function executeTradeAPI(instrumentID,quantity, buy_sell) 
    {
        let placeOrderRequest = {
        exchangeSegment: 'NSEFO', //''NSECM
        exchangeInstrumentID: instrumentID, //"SBIN-EQ", //22, BANKNIFTY 28JUL29SEP SPD
        productType: 'MIS', //THIS IS FOR INTRADAY
        orderType: 'MARKET',
        orderSide: buy_sell,

        timeInForce: 'DAY',
        disclosedQuantity: 0,
        orderQuantity: quantity,
        limitPrice: 2000,
        stopPrice: 0,
        orderUniqueIdentifier: '45485',
        clientID: userID
        };

        let response =await placeOrder(placeOrderRequest);
        return response; 
    }

    var placeOrder = async function (placeOrderRequest) {
        let tradeprice = 0;
        let responseorder = await xtsInteractive.placeOrder(placeOrderRequest);
        var orderype =  responseorder.type;

        if(orderype=="success"){
            excutedprice = await getOrderAPI(responseorder.result.AppOrderID);
            tradeprice = ({
                message: excutedprice.message,
                tradeprice:excutedprice.executionPrice,
                apporderNo:excutedprice.apporderNo,
                data:excutedprice,
                exchangeInstrumentID:placeOrderRequest.exchangeInstrumentID,
                buy_sell:placeOrderRequest.orderSide
            })
        }
        else{
            tradeprice =  ({
                message: 'error occured!',
                executionPrice:0,
                apporderNo:'',
                data:responseorder,
                exchangeInstrumentID:placeOrderRequest.exchangeInstrumentID,
                buy_sell:placeOrderRequest.orderSide
            });
        }
        return tradeprice;
    }

    async function getOrderAPI(appOrderID) 
    {
        let response = await xtsInteractive.getOrderBook();
        var tradetype =  response.type;
        var tradeexecutedprice = 0;

        if(tradetype=="success"){
            var orderdetailsfind = response.result;
            for(i=0;i<orderdetailsfind.length;i++)
            {
                if(appOrderID == orderdetailsfind[i].AppOrderID){
                    tradeexecutedprice = orderdetailsfind[i].OrderAverageTradedPrice;
                }
            }
        }
        return ({
            message: 'Order placed sucessfully!',
            executionPrice:tradeexecutedprice,
            apporderNo:appOrderID
        });
    }
module.exports = {executetrade}
