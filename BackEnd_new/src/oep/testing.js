// //only for testing
//const TRADE_EXECUTION = require('./trade_serverExe');
// instrumentId = "13793420" // "HINDALCO-EQ" //WIPRO-EQ" //ACC-EQ";
// orderquantity = 1
// buysell = 'BUY'
// let orderno = TRADE_EXECUTION.executetrade(instrumentId, orderquantity, buysell);
// orderno.then(data => {
//         console.log(data.message, data.executionPrice, data.apporderNo, data.data);
//     });
   
const {executeTradeAPI,getInteractiveAPI, InteractiveAPILogin } = require("../oep/trade_execution");
async function tradeExecutiontoBroker() {
    var abeesg = [
        {buysell: 'SELL',   orderquantity: 250, instrumentId: '42489'},
        {buysell: 'SELL',   orderquantity: 250, instrumentId: '42485'},
        {buysell: 'SELL',   orderquantity: 250, instrumentId: '42488'},
        {buysell: 'SELL',   orderquantity: 250, instrumentId: '42492'},
        {buysell: 'BUY',    orderquantity: 250, instrumentId: '42489'},
        {buysell: 'BUY',    orderquantity: 250, instrumentId: '42485'},
        {buysell: 'BUY',    orderquantity: 250, instrumentId: '42488'},
        {buysell: 'BUY',    orderquantity: 250, instrumentId: '42492'}]
        let xts         = await getInteractiveAPI();
        let xtslogin    = await InteractiveAPILogin(xts);
        for(counterid=0; counterid<abeesg.length; counterid++)
        {
            instrumentId = abeesg[counterid].instrumentId;
            orderquantity = abeesg[counterid].orderquantity;
            buysell = abeesg[counterid].buysell;
            let tradeexeresult = await executeTradeAPI(instrumentId, orderquantity, buysell, xts)
            console.log(tradeexeresult.message, tradeexeresult.tradeprice, tradeexeresult.exchangeInstrumentID, tradeexeresult.buy_sell, tradeexeresult.apporderNo)        
        }
    }
tradeExecutiontoBroker()
