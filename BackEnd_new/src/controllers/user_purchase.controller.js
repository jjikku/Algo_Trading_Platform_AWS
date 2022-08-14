let mongoose = require('mongoose');
let mailer = require('../helper/mailer');
let razorpayInstance = require('../helper/razorpay');
let UserSubscribeModel = require('../model/usersubscribe.Model');

module.exports.purchase = async (req, res) => {
    let data = req.body;
    var options = {
        amount: data.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: data.user_email,
        payment_capture: '0'
    };
    console.log(options)
    razorpayInstance.instance.orders.create(options, function (razor_error, order) {
        if (razor_error) {
            console.log("razor error ", razor_error)
            res.status(417).json({
            message: razor_error.message,payload: null,
            error: "razor pay order creation unsuccessful"
        });
        } else {
            console.log("order created successfully")
            data["order"] = order;
            console.log(data["order"])
            dbRes = order;
            res.status(200).json({
                message: "order created successfully",
                payload: {dbRes, key: razorpayInstance.config.key_id},
                error: null
            });
        }
    });
}

module.exports.purchase_success = async (req, res) => {
    try {
        let body = req.body;
        console.log(body)
        await mailer.sendMail("you have a sucessfully subscribed algo trade !!", body, body.user_email, 'user_purchase_self')
        var newusersubscribtion = {
            email:body.user_email,
            fname:body.user_name,
            Amount:body.amount,
            SubscriptionID:body.user_subscrionId,
            Orderid:body._id
       };
        UserSubscribeModel.deleteMany({$and: [{email:body.user_email},{SubscriptionID:body.user_subscrionId}]}).then(function(){
            console.log("UserSubscribeModel Data deleted"); // Success
        }).catch(function(error){
            console.log("UserSubscribeModel", error); // Failure
        });

        let addUserSubscribe = new UserSubscribeModel(newusersubscribtion);
        addUserSubscribe.save(async (error, dbRes) => {
            if (error) {
                console.log("this is the error in save User Subscribe", error);
            }
            else
            {
                console.log("sucess");
                res.status(200).json({
                    message: "user subscribed added successfully",
                    payload: body,
                    error: null
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}

module.exports.get_single_business = (req, res) => {
    try {
        let emailid = req.params._id;
        UserSubscribeModel.find({
            email: emailid
        },(error, dbres) => {
            if(error){
                console.log("this is the error", error);
            }
            else
            {
                if(dbres){
                    res.status(200).json({
                        message: "class added sucessfully",
                        payload: dbres,
                        error: null
                    });
                }else{
                    res.status(404).json({
                        message: "no data available",
                        payload: null,
                        error: "no data available"
                    })
                }
            }
        })
}
catch (error) {
    res.status(500).json({
        message: error.message,
        payload: null,
        error: "some error saving the class"
    });
    }
}

module.exports.get_subscription_validity = (req, res) => {
    try {
        let emailid = req.params._id;
        
        var datenowtime = new Date();
        const pipeline= [
            { '$match' : { 'email' : emailid }},	
            { '$sort'  : {'SubscriptionID' : -1 }},
            { '$limit' : 1 },
            { '$project' : { 'SubscriptionID': '$SubscriptionID', 'Start': '$creationDate', 'End': datenowtime,
                           'days': {'$dateDiff':
                           {'startDate': '$creationDate',
                            'endDate': datenowtime, 
                            'unit': 'day'}},'_id': 0}
            }
         ]
         console.log(pipeline);
        UserSubscribeModel.aggregate(pipeline,(error, dbres) => {
            if(error){
                console.log("this is the error aggregate", error);
            }
            else
            {
                if(dbres){
                    console.log(dbres)
                    res.status(200).json({
                        message: "class added sucessfully aggregate",
                        payload: dbres,
                        error: null
                    });
                }else{
                    res.status(404).json({
                        message: "no data available aggregate",
                        payload: null,
                        error: "no data available aggregate"
                    })
                }
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}