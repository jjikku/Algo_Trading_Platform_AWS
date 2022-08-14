let Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_fzVTel8HKHXKWU',
    key_secret: 'EN4B6A6Kmk8ZeiDAGzthul7K'
  });

  let RazorpayConfig={
    key_id: 'rzp_test_fzVTel8HKHXKWU',
    key_secret: 'EN4B6A6Kmk8ZeiDAGzthul7K'
  }
  module.exports.config = RazorpayConfig;
  module.exports.instance = instance;
