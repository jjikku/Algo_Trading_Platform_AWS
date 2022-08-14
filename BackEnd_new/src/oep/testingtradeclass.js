async function getInteractiveAPI() {
    var XtsInteractiveAPI = require('xts-interactive-api').Interactive;
    var config = require('./config.json');
    let url = config.url;
    var xtsInteractiveAPI = new XtsInteractiveAPI(url);
    return xtsInteractiveAPI;
}

async function InteractiveAPILogin(xtsInteractiveAPI){
    var config = require('./config.json');
    let secretKey = config.secretKey;
    let appKey = config.appKey;
    let source = config.source;
    var loginRequest = {secretKey,appKey,source,};
    let logIn = await xtsInteractiveAPI.logIn(loginRequest);
    if (logIn && logIn.type == xtsInteractiveAPI.responseTypes.success) {
        userID = logIn.result.userID;
        return userID;
    } else {
        console.error(logIn);
    }
}   

async function executeTradeAPI(instrumentID,quantity, buy_sell, xtsInteractive) 
{
    let placeOrderRequest = {
        exchangeSegment: 'NSEFO',
        exchangeInstrumentID: instrumentID,
        productType: 'MIS', orderType: 'MARKET',
        orderSide: buy_sell,
        timeInForce: 'DAY',disclosedQuantity: 0,
        orderQuantity: quantity,
        limitPrice: 2000,stopPrice: 0,
        orderUniqueIdentifier: '45485',
        clientID: userID
    };

    let tradeprice = 0;
    let responseorder = await xtsInteractive.placeOrder(placeOrderRequest);
    var orderype =  responseorder.type;

    if(orderype=="success"){
        
        let appOrderID = responseorder.result.AppOrderID
        let response = await xtsInteractive.getOrderBook();
        var tradetype =  response.type;
        var tradeexecutedprice = 0;

        if(tradetype=="success"){
            var orderdetailsfind = response.result;
            for(let pricei=0; pricei<orderdetailsfind.length; pricei++)
            {
                if(appOrderID == orderdetailsfind[pricei].AppOrderID){
                    tradeexecutedprice = orderdetailsfind[pricei].OrderAverageTradedPrice;
                }
            }
        }
        tradeprice = ({
            message: 'Order placed sucessfully!',
            tradeprice:tradeexecutedprice,
            apporderNo:appOrderID,
            data:responseorder,
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

module.exports = {executeTradeAPI,getInteractiveAPI,InteractiveAPILogin}
