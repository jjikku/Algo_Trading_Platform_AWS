const express = require("express");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../model/users.model");
var bcrypt = require("bcrypt");

loginRouter.post("/", async function (req, res) {
  var flag = 0;
  var token;
  var checkuser = {
    email: req.body.login.email,
    pwd: req.body.login.pwd,
  };

  try {
    users.findOne({ email: checkuser.email }, (error, user) => {
      if (error) {
        console.log(error);
      } else {
        //let compare = bcrypt.CompareHashAndPassword(checkuser.pwd,user.pwd)
        if (!user) {
          //res.status(401).send("Invalid Email");
          res.json({ status: false });
        } else {
          bcrypt.compare(checkuser.pwd, user.pwd, (err, response) => {
            if (err) return err;
            if (!response) {
              console.log("hashed pwd not matched");
              //res.status(401).send("Invalid Password");
              res.json({ status: false });
            } 
            else if(user.blockstatus===1) {
              console.log(user.blockstatus);
              res.status(200).send({blockstatus:user.blockstatus});
              
          }

            else {
              console.log("password matched");
              let payload = { subject: user._id };
              token = jwt.sign(payload, "secretkey");
              res
                .status(200)
                .send({
                  status: true,
                  blockstatus:user.blockstatus,
                  fname: user.fname,
                  lname: user.lname,
                  isAdmin: user.isAdmin,
                  token: token,
                  email: user.email,
                });
            }
          });
        }
      }
    });
  } catch (e) {
    console.log("error");
    res.send(e);
  }
});

module.exports = loginRouter;
