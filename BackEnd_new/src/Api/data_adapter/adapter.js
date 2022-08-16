const Promise = require('bluebird');                        
const fs = require('fs');
const CONFIG = require('../../config/config');

const byline = require('byline');                           

let secretKey = CONFIG.development.MD_secretKey;
let appKey = CONFIG.development.MD_appKey;
let source = CONFIG.development.MD_source;
let url = CONFIG.development.MD_url;
let userID = CONFIG.development.userID;
let isTradeSymbol = false;

function readCSV(file, callback) {
    let stream = fs.createReadStream(file);
    stream = byline.createStream(stream);
    stream.on('data', (line) => {
      stream.pause();
      Promise.resolve(line.toString())
        .then(callback)
        .then(() => setTimeout(() => stream.resume(), 10));
    });
  }
  

//login();
async function getxts() {
  var XtsMarketDataAPI = require('xts-marketdata-api').XtsMarketDataAPI;
    var xtsMarketDataAPI = new XtsMarketDataAPI(url);
    return xtsMarketDataAPI;
}

async function API_Md_login (xtsMarketDataAPI) {
  //var XtsMarketDataAPI = require('xts-marketdata-api').XtsMarketDataAPI;

    //creating the instance of XTSRest
     //xtsMarketDataAPI = new XtsMarketDataAPI(url);
  
    //calling the logIn API
    var loginRequest = {
      secretKey,
      appKey,
    };
  
    let logIn = await xtsMarketDataAPI.logIn(loginRequest);
  
    // checking for valid loginRequest
    if (logIn && logIn.type == xtsMarketDataAPI.responseTypes.success) {
      userID = logIn.result.userID;
      console.log('user ID = ' + userID);
      console.log('token = ' + logIn.result.token);
      

      
      //calling the remaining methods of the Interactive API
      //testAPI();
    } else {
      //In case of failure
      console.error(logIn);
    }
  };
  

  // Get Instrument Master List
  async function getMasterData(xtsMarketDataAPI) {
     await API_Md_login(xtsMarketDataAPI);

    console.log("inside master data");
    // get enums of application
    //await clientConfig();
    
    let instrumentMasterRequest = {
      exchangeSegmentList: ['NSEFO'],
    };
  
  
    var instrumentMaster = async function (instrumentMasterRequest) {
      let response = await xtsMarketDataAPI.instrumentMaster(
        instrumentMasterRequest
      );

      //console.log(response);
      //var inst_data = JSON.stringify(response).split('\\n');
      fs.writeFileSync("./src/Api/data_adapter/inst_master",JSON.stringify(response));

      //return response;
    };

    await instrumentMaster(instrumentMasterRequest);

  }

  // Get Instrument ID
  function getInstId(strike,expiry,callback) {
    let inst_id = "";
    //console.log('strike = ' + strike);
    //console.log('expiry = ' + expiry);
     fs.readFile('./src/Api/data_adapter/inst_master', function(err, data) {
      if(err) throw err;
      const arr = data.toString().split('\\n');
      for(let i of arr) {
        let re = `(NSEFO).+(BANKNIFTY).+(${strike}).+(OPTIDX).+(${expiry})`;
        if(i.match(re))
        {
            inst_id = i.split('|')[1];
            //console.log('before return ' + inst_id);
            callback(inst_id);
        }
          

      }

  });

  }

 async function getLTP(xtsMarketDataAPI,inst_id) { 
  //console.log('inst id in getLTP() = ' + inst_id);  
  var LTP;
  let getQuotesRequest = {
    isTradeSymbol: isTradeSymbol,
    instruments: [
      {
        exchangeSegment: 2,
        exchangeInstrumentID: inst_id,
      }
     
    ],
    xtsMessageCode: 1512,
    publishFormat: 'JSON',
  };

  async function getBnLTP(xtsMarketDataAPI) { 
    //console.log('inst id in getLTP() = ' + inst_id);  
    var LTP;
    let getQuotesRequest = {
      isTradeSymbol: isTradeSymbol,
      instruments: [
        {
          exchangeSegment: 1,
          exchangeInstrumentID: '26001',
        }
       
      ],
      xtsMessageCode: 1512,
      publishFormat: 'JSON',
    };
  }

  var getQuotes = async function (getQuotesRequest) {
    //console.log(getQuotesRequest)

   
      //console.log("LTP response = " + response);

    try{
      let response = await xtsMarketDataAPI.getQuotes(getQuotesRequest);

      LTP = (JSON.parse((response.result.listQuotes)))['LastTradedPrice'];

    }
    catch(e) {
      console.log(e);
    }
    //console.log('LTP in = ' + LTP);
  
  };
 
  await getQuotes(getQuotesRequest);
  
  // setInterval(async () => {
  
  //   console.log('Wait for 1 second...')
  //   await getQuotes(getQuotesRequest);

  //   }, 1000)
    return LTP;
 
}



module.exports = {readCSV,getxts, API_Md_login,getMasterData,getInstId,getLTP};