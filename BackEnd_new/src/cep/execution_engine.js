const { readCSV } = require("../Api/data_adapter/adapter");
const { API_Md_login, getxts } = require("../Api/data_adapter/adapter");
const { getMasterData } = require("../Api/data_adapter/adapter");
const { getInstId } = require("../Api/data_adapter/adapter");
const { getLTP } = require("../Api/data_adapter/adapter");
const async = require("async");
const set_n = require("./strategy_functions");
//const TRADE_EXECUTION = require("../oep/trade_execution");
const {
  executeTradeAPI,
  getInteractiveAPI,
  InteractiveAPILogin,
} = require("../oep/trade_execution");

const order_array = [];
var order = [];
global.exitRoute;

// Loaded from DB on deploy
//function dummy_straddle() {var s, ce, pe;var set1 = set_n("09:16:00","15:25:00",40,"s","CE",37900,"2022-08-04",10);var set2 = set_n("09:16:00","15:25:00",40,"s","PE",37900,"2022-08-04",10);var set3 = set_n("09:20:00","15:20:00",60,"s","PE",38000,"2022-08-04",20);var set4 = set_n("09:25:00","15:20:00",60,"s","CE",38000,"2022-08-04",20);function set_n(entry_time,exit_time,stop_loss_percentage,buy_sell,ce_pe,strike,expiry,qty_in_lots) {var set_params = {entry_time: entry_time,buy_sell: buy_sell,exit_time: exit_time,stop_loss_percentage: stop_loss_percentage,ce_pe: ce_pe,strike: strike,expiry: expiry,qty_in_lots: qty_in_lots,};return set_params;}return [set1, set2, set3, set4];}
var flag = 0;
async function execution_engine(strategy, res) {
  if (!exitRoute) {
    var buy_sell = [];
    var flag = [];
    var exit_flag = [];
    var price_flag = [];

    var inst_id = [];
    var LTP = [];
    var curr_hrs = [];
    var curr_mins = [];
    var curr_secs = [];
    var entry_hrs = [];
    var entry_mins = [];
    var entry_secs = [];
    var exit_hrs = [];
    var exit_mins = [];
    var exit_secs = [];
    var exit_ready = [];
    var entry_price = [];
    var exit_price = [];
    var strike = [];
    var res_data = [];
    console.log("Strategy = " + strategy);
    //await API_Md_login();
    let xts = await getxts();
    await API_Md_login(xts);
    await getMasterData(xts);
    let xts_int = await getInteractiveAPI();
    let xtslogin = await InteractiveAPILogin(xts_int);

    let F = new Function("return " + strategy)();

    let set_n_params = F();
    console.log("set_n_params");
    console.log(set_n_params);
    set_length = set_n_params.length;
    console.log("length =" + set_length);
    for (j = 0; j < set_length; j++) {
      exit_flag[j] = 0;
      price_flag[j] = 0;
    }

    console.log("exit = " + exit_flag);
    set_n_params.forEach(async function (element, i) {
      //console.log("inside foreach");
      async.parallel({
        i: async function () {
          strike[i] =
            element.strike + ":" + element.ce_pe + ":" + element.expiry;

          function getLtp(callback) {
            //console.log("inside getLTP");
            //var strike[i] = (element.strike == ATM)
            try {
              getInstId(
                element.strike + element.ce_pe,
                element.expiry,
                function (random_data) {
                  callback(random_data);
                }
              );
            } catch (err) {
              console.log(err);
            }

            //return inst_id[i];
          }

          var id = setInterval(async () => {
            console.log("exit ready = " + exit_ready[i]);
            getLtp(async function (result) {
              inst_id[i] = result;
              //console.log("EE = " + inst_id[i]);

              LTP[i] = await getLTP(xts, inst_id[i]);
              buy_sell[i] = element.buy_sell;
              //console.log("inst ID = " + inst_id[i] + ": LTP = " + LTP[i]);

              let date_obj = new Date();
              curr_time =
                date_obj.getHours() +
                ":" +
                date_obj.getMinutes() +
                ":" +
                date_obj.getSeconds();
              curr_hrs[i] = parseInt(date_obj.getHours());
              curr_mins[i] = parseInt(date_obj.getMinutes());
              curr_secs[i] = parseInt(date_obj.getSeconds());
              //console.log("Entry time = " + element.entry_time);
              //console.log("Curr time = " + curr_time);
              entry_hrs[i] = parseInt(element.entry_time.split(":")[0]);
              entry_mins[i] = parseInt(element.entry_time.split(":")[1]);
              entry_secs[i] = parseInt(element.entry_time.split(":")[2]);
              if (curr_hrs[i] > entry_hrs[i] && !flag[i]) {
                flag[i] = 1;
                entry_price[i] = await placeOrder(
                  buy_sell[i],
                  flag[i] ? element.qty_in_lots : 0,
                  inst_id[i]
                );
                console.log(
                  "ENTRY - inst ID = " +
                    buy_sell[i] +
                    ":" +
                    inst_id[i] +
                    "entry_price = " +
                    entry_price[i] +
                    ": exit_price = " +
                    exit_price[i]
                );

                //entry_price[i] = LTP[i];
              } else if (curr_hrs[i] == entry_hrs[i] && !flag[i]) {
                if (curr_mins[i] > entry_mins[i]) {
                  flag[i] = 1;
                  await placeOrder(
                    buy_sell[i],
                    flag[i] ? element.qty_in_lots : 0,
                    inst_id[i]
                  );
                  console.log(
                    "ENTRY - inst ID = " +
                      buy_sell[i] +
                      ":" +
                      inst_id[i] +
                      "entry_price = " +
                      entry_price[i] +
                      ": exit_price = " +
                      exit_price[i]
                  );

                  entry_price[i] = LTP[i];
                } else if (curr_mins[i] == entry_mins[i]) {
                  if (curr_secs[i] >= entry_secs[i]) {
                    flag[i] = 1;
                    entry_price[i] = await placeOrder(
                      buy_sell[i],
                      flag[i] ? element.qty_in_lots : 0,
                      inst_id[i]
                    );
                    console.log(
                      "ENTRY - inst ID = " +
                        buy_sell[i] +
                        ":" +
                        inst_id[i] +
                        "entry_price = " +
                        entry_price[i] +
                        ": exit_price = " +
                        exit_price[i]
                    );

                    //entry_price[i] = LTP[i];
                  }
                }
              }
              //console.log('exit_ready before buy sell : =' + exit_ready);
              //console.log('flag before buy sell       : =' + flag[i]);
              //console.log('exit flag before buy sell  : =' + exit_flag[i]);
              //console.log('buy_sell before buy sell   : =' + buy_sell[i]);
              exit_ready[i] = exitRoute ? 1 : exit_ready[i];

              if (buy_sell[i] == "s") {
                exit_hrs[i] = parseInt(element.exit_time.split(":")[0]);
                exit_mins[i] = parseInt(element.exit_time.split(":")[1]);
                exit_secs[i] = parseInt(element.exit_time.split(":")[2]);
                let date_obj = new Date();
                curr_time =
                  date_obj.getHours() +
                  ":" +
                  date_obj.getMinutes() +
                  ":" +
                  date_obj.getSeconds();
                curr_hrs[i] = parseInt(date_obj.getHours());
                curr_mins[i] = parseInt(date_obj.getMinutes());
                curr_secs[i] = parseInt(date_obj.getSeconds());
                exit_ready[i] = !exitRoute
                  ? curr_hrs[i] > exit_hrs[i]
                    ? 1
                    : curr_hrs[i] == exit_hrs[i]
                    ? curr_mins[i] > exit_mins[i]
                      ? 1
                      : curr_mins[i] == exit_mins[i]
                      ? curr_secs[i] >= exit_secs[i]
                        ? 1
                        : 0
                      : 0
                    : 0
                  : 1;

                //      console.log('close:' + close);
                //      console.log('entry: = ' + entry_price);
                if (
                  (LTP[i] >=
                    entry_price[i] * (element.stop_loss_percentage / 100 + 1) ||
                    LTP[i] <=
                      entry_price[i] *
                        (1 - element.target_profit_percentage / 100) ||
                    exit_ready[i]) &&
                  flag[i] &&
                  !exit_flag[i]
                ) {
                  let buy_sell = "b";
                  exit_flag[i] = 1;

                  //order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
                  exit_price[i] = await placeOrder(
                    buy_sell,
                    flag[i] ? element.qty_in_lots : 0,
                    inst_id[i]
                  );
                  price_flag[i] = 1;
                  console.log(
                    "EXIT - inst ID = " +
                      buy_sell +
                      ":" +
                      inst_id[i] +
                      "entry_price = " +
                      entry_price[i] +
                      ": exit_price = " +
                      exit_price[i] +
                      "i = " +
                      i +
                      "  exit_flag = " +
                      exit_flag[i]
                  );

                  //push_order_array(order[i]);
                  //exit_price[i] = LTP[i];
                }
              } else if (buy_sell[i] == "b") {
                exit_hrs[i] = parseInt(element.exit_time.split(":")[0]);
                exit_mins[i] = parseInt(element.exit_time.split(":")[1]);
                exit_secs[i] = parseInt(element.exit_time.split(":")[2]);
                let date_obj = new Date();
                curr_time =
                  date_obj.getHours() +
                  ":" +
                  date_obj.getMinutes() +
                  ":" +
                  date_obj.getSeconds();
                curr_hrs[i] = parseInt(date_obj.getHours());
                curr_mins[i] = parseInt(date_obj.getMinutes());
                curr_secs[i] = parseInt(date_obj.getSeconds());
                exit_ready[i] = !exitRoute
                  ? curr_hrs[i] > exit_hrs[i]
                    ? 1
                    : curr_hrs[i] == exit_hrs[i]
                    ? curr_mins[i] > exit_mins[i]
                      ? 1
                      : curr_mins[i] == exit_mins[i]
                      ? curr_secs[i] >= exit_secs[i]
                        ? 1
                        : 0
                      : 0
                    : 0
                  : 1;

                //      console.log('close:' + close);

                if (
                  (LTP[i] <=
                    entry_price[i] * (1 - element.stop_loss_percentage / 100) ||
                    LTP[i] >=
                      entry_price[i] *
                        (element.target_profit_percentage / 100 + 1) ||
                    exit_ready[i]) &&
                  flag[i] &&
                  !exit_flag[i]
                ) {
                  let buy_sell = "s";
                  exit_flag[i] = 1;

                  //order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
                  exit_price[i] = await placeOrder(
                    buy_sell,
                    flag[i] ? element.qty_in_lots : 0,
                    inst_id[i]
                  );
                  price_flag[i] = 1;

                  console.log(
                    "EXIT - inst ID = " +
                      buy_sell +
                      ":" +
                      inst_id[i] +
                      "entry_price = " +
                      entry_price[i] +
                      ": exit_price = " +
                      exit_price[i] +
                      "i = " +
                      i +
                      "  exit_flag = " +
                      exit_flag[i]
                  );
                  //push_order_array(order[i]);
                  //exit_price[i] = LTP[i];
                  //console.log("LTP after exit = " + LTP[i]);
                }
              }
            });

            // console.log("entry =" + entry_price[i]);
            // console.log("exit =" + exit_price[i] + "flag = " + exit_flag[i]);

            res.write(`id: ${i}\n`);
            res.write("event: LTP\n");
            res_data[i] =
              i +
              ":" +
              strike[i] +
              ":" +
              entry_price[i] +
              ":" +
              LTP[i] +
              ":" +
              element.qty_in_lots +
              ":" +
              buy_sell[i] +
              ":" +
              exit_flag[i] +
              ":" +
              exit_price[i];
            res.write(`data: ${JSON.stringify({ inst: res_data[i] })}\n\n`);

            res.flush;

            const isTrue = (currentValue) => currentValue == 1;

            if (price_flag.every(isTrue)) {
              //console.log("EXIT = exited " + inst_id[i]);

              clearInterval(id);
              return;
            }
          }, 1000);

          async function placeOrder(buy_sell, qty, inst_id) {
            var buy_or_sell = buy_sell == "s" ? "SELL" : "BUY";
            order = { inst: inst_id, buy_sell: buy_or_sell, qty: qty };
            console.log("inst id order placement = " + inst_id);
            order_details = await executeTradeAPI(
              inst_id,
              25 * parseInt(qty),
              buy_or_sell,
              xts_int
            );
            //push_order_array(order);
            console.log("TRADE EXECUTED PRICE = " + order_details.tradeprice);
            return order_details.tradeprice;
          }
        },
      });
    });
  }
}

module.exports = { execution_engine };
// module.exports = pop_order_array;
//  {
//     pop_order_array,
//     execution_engine,
//     dummy
// };
