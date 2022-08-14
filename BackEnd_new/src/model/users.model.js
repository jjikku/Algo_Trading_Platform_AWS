const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  const Schema = mongoose.Schema;

var UsersSchema = new Schema({
    fname: String,
    lname:String,
    email:String,
    pwd:String,
    blockstatus:Number,
    userstatus:Number,
    isAdmin:Number
});

var usersModel = mongoose.model('userslogin', UsersSchema, "users");                        //UserData is the model and NewBookData is the schema

module.exports = usersModel;