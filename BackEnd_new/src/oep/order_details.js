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

async function getorderdetails(appOrderID, res) {
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
        let c = getOrderAPI(appOrderID);
        return c;
    } else {
        //In case of failure
        console.error(logIn);
    }
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
module.exports = {getorderdetails}
