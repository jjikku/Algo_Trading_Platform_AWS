let router = require('express').Router();
let UserPurcahseCntrl = require('../controllers/user_purchase.controller')
router.route('/purchase').post(UserPurcahseCntrl.purchase);
router.route('/purchasecompletesuccess').put(UserPurcahseCntrl.purchase_success);
router.route('/purchase/:_id').get(UserPurcahseCntrl.get_single_business);
router.route('/purchasesubscribedate/:_id').get(UserPurcahseCntrl.get_subscription_validity);
module.exports = router;
