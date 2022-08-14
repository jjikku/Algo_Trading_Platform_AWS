function set_n(entry_time,exit_time,stop_loss_percentage,buy_sell,ce_pe,strike,expiry,qty_in_lots) {
    var set_params = {
        entry_time:entry_time,
        exit_time:exit_time,
        stop_loss_percentage:stop_loss_percentage,
        buy_sell:buy_sell,
        ce_pe:ce_pe,
        strike:strike,
        expiry:expiry,
        qty_in_lots:qty_in_lots
    };
    return set_params;
}

module.exports = set_n;


// CSV read code - For reference only
// if(element.ce_pe === 'ce')
        // {
        //     readCSV("../Api/34800CE.csv", function(ce_data){
        //         //console.log(ce_data);
        //         let time = ce_data.toString().split(',')[0].split(' ')[1];
        //         let close = parseInt(ce_data.toString().split(',')[4]);
        //         //  console.log('ce time = ' + time);
        //         //  console.log('ce close = ' + close);
        //          if(time == element.entry_time)
        //          {
        //             console.log('time match');
        //             ce_entry_price[i] = close;
        //             ce_inst[i] = element.ce_pe;
        //             ce_strike[i] = element.strike;
        //             ce_expiry[i] = element.expiry;
        //             ce_buy_sell[i] = element.buy_sell;
        //             console.log('buy_sell:',ce_buy_sell[i]);

        //             ce_qty[i] = element.qty_in_lots;
        //             order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:ce_buy_sell[i],qty:ce_qty[i]};
        //             push_order_array(order[i]);
        //             ce_flag[i] = 0;
        //          }

        //          else if(ce_buy_sell[i] === 's')
        //             {

        //           //      console.log('close:' + close);
        //           //      console.log('entry: = ' + entry_price);
        //                 if(((close >= ce_entry_price*((element.stop_loss_percentage/100)+1)) || (time == element.exit_time)) && !ce_flag[i])
        //                 {
        //                     let buy_sell = 'b';
        //                     order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
        //                     push_order_array(order[i]);
        //                     ce_flag[i] = 1;
        //                 }
        //             }
        //             else if(ce_buy_sell[i] === 'b')
        //             {
        //                 if(((close <= ce_entry_price*(1-(element.stop_loss_percentage/100))) || (time == element.exit_time)) && !ce_flag[i])
        //                 {
        //                     let buy_sell = 's';
        //                     order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
        //                     push_order_array(order[i]);
        //                     ce_flag[i] = 1;

        //                 }

        //             }
        //     });
        // }
        // else if(element.ce_pe === 'pe')
        // {
        //     readCSV('../Api/34800PE.csv', function(pe_data){
        //         //console.log(pe_data);
        //         let time = pe_data.toString().split(',')[0].split(' ')[1];
        //         let close = pe_data.toString().split(',')[4];
        //         //  console.log('pe time = ' + time);
        //         //  console.log('pe close = ' + close);
        //         // console.log(time);
        //         // console.log(element.entry_time);
        //          if(time == element.entry_time)
        //          {
        //             console.log('time match');
        //              pe_entry_price[i] = close;
        //              pe_inst[i] = element.ce_pe;
        //              pe_strike[i] = element.strike;
        //              pe_expiry[i] = element.expiry;
        //              pe_buy_sell[i] = element.buy_sell;
        //              pe_qty[i] = element.qty_in_lots;
        //              order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:pe_buy_sell[i],qty:pe_qty[i]};
        //              //console.log(order[i]);
        //             push_order_array(order[i]);
        //             pe_flag[i] = 0;

        //          }
        //          if(pe_buy_sell[i] === 's')
        //             {
        //                 //console.log('exit = '+element.exit_time);
        //                 //console.log('time = '+time);
        //                 if(((close >= pe_entry_price*((element.stop_loss_percentage/100)+1))  || (time == element.exit_time)) && !pe_flag[i])
        //                 {
        //                     let buy_sell = 'b';
        //                     order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:buy_sell,qty:pe_qty[i]};
        //                     push_order_array(order[i]);
        //                     pe_flag[i] = 1;

        //                 }
        //             }
        //             else if(pe_buy_sell[i] === 'b')
        //             {
        //                 if(((close <= pe_entry_price*(1-(element.stop_loss_percentage/100)))  || (time == element.exit_time)) && !pe_flag[i])
        //                 {
        //                     let buy_sell = 's';
        //                     order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:buy_sell,qty:pe_qty[i]};
        //                     push_order_array(order[i]);
        //                     pe_flag[i] = 1;
        //                 }

        //             }

        //     });
        // }

        //callback(null, i);