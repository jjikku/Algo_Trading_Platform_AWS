const express = require("express");
//const editBooksRouter = express.Router();
const editUsersRouter=express.Router();
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");

//const { verifyToken } = require("../../ verifytoken");
function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];
  console.log("auth = " + auth);
  if (!auth) {
    console.log("No auth");
    return res.status(200).send(req);
  }
  let token = auth.split(" ")[1];
  if (token === "") {
    console.log("No token");

    return res.status(401).send("Unauthorized Request");
  }
  let payload = jwt.verify(token, "secretkey");
  if (!payload) {
    console.log("No payload");

    return res.status(401).send("Unauthorized Request");
  }
  req.userId = payload.subject;
  next();
}

editUsersRouter.post("/:id", verifyToken, function (req, res) {

  var editedUser = {
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    email: req.body.user.email,
    pwd: req.body.user.pwd
  };
  console.log("Edit User route(Edit Users Router)");
  console.log(editedUser);
  //var edituser = new userModel(editedUser);
  
  userModel.findByIdAndUpdate(
    req.params.id, { $set: editedUser },{new:true},
  // userModel.findByIdAndUpdate(
  //   req.params.id, { $set: req.body },{new:true},
    function (err, data) {
      if (err) {
        res.status(401).send(err);
      } else {
        res.send(data);
      }
    }
  );
});

module.exports = editUsersRouter;
