let Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test',
    key_secret: 'dummy'
  });

  let RazorpayConfig={
    key_id: 'rzp_test',
    key_secret: 'dummy'
  }
  module.exports.config = RazorpayConfig;
  module.exports.instance = instance;
