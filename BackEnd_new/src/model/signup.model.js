const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  const Schema = mongoose.Schema;

var NewSignupSchema = new Schema({
    fname: String,
    lname:String,
    email:String,
    pwd:String,
    blockstatus:Number,
    userstatus:Number,
    isAdmin:Number	
});

var signupModel = mongoose.model('users', NewSignupSchema);                        //UserData is the model and NewBookData is the schema

module.exports = signupModel;