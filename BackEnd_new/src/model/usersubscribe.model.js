const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
const Schema = mongoose.Schema;

const usersubscribeSchema = new Schema({
    email:String,
    fname: String,
    SubscriptionID:Number,
    Amount:Number,
    Orderid:String,
    creationDate:{type:Date, default:Date.now }
});
 
const usersubscribeModel = mongoose.model("usersubscribe", usersubscribeSchema, "usersubscribe");

module.exports = usersubscribeModel;
