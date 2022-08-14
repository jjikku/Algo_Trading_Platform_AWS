const express = require("express");
//const booksRouter = express.Router();
const usersRouter = express.Router();
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

function verifyToken(req,res,next) {
     const auth =  req.headers['authorization'];
     //console.log("auth = " + auth);
    if(!auth)
    {
        console.log("No auth");
      return res.status(200).send(req);
    }
    let token = auth.split(" ")[1];
    if(token === "")
    {
        console.log("No token");

      return res.status(401).send("Unauthorized Request");
  
    }
    let payload = jwt.verify(token,"secretkey");
    if(!payload)
    {
        console.log("No payload");

      return res.status(401).send("Unauthorized Request");
  
    }
    req.userId = payload.subject;
    next();
  }

  usersRouter.post("/adduser", verifyToken, function (req, res) {

    var hashedPassword;

  bcrypt.genSalt(10, function (err, Salt) {
  
    // The bcrypt is used for encrypting password.
    bcrypt.hash(req.body.signup.pwd, Salt, function (err, hash) {
  
        if (err) {
            return console.log('Cannot encrypt');
        }
  
        hashedPassword = hash;
        console.log("hashed pwd = " + hash);
        var newuser = {
          fname: req.body.user.fname,
          lname: req.body.user.lname,
          email: req.body.user.email,
          pwd: hashedPassword,
          blockstatus:0,
          userstatus:1,
          isAdmin:0
         };

         console.log("Signup Route")
         console.log("Add User Route")
         userModel.findOne({ "email": newuser.email }, (error,user) => {
             if(error)
             {
               console.log(error);
    
             }
             else if(user)
             {
               console.log("This Email Id Exists");
               res.json({status:false});
             }
             else
             {
              var adduser = new userModel(newuser);
               adduser.save((error,newuser) => {
                 console.log("User Saved");
                 console.log("New User=" + newuser);
                 if(error)
                 {
                   console.log(error);
                   res.json({status:true});
                 }
                 else
                 {
                  res.json({status:true});
                 }
               } 
               );
             }
         });
        
    })
  });
  });
  
  usersRouter.get("/",verifyToken, function(req,res){
    console.log("User List Function ");
     //console.log(checkuser);
     try{
      userModel.find({})
        .then ((users) => {
            //console.log(books);
            res.send(users);

        });
        }
        catch(e)
        {
            console.log(e);
            console.log("error");
            res.send(e);
        }

    });
  
    usersRouter.get("/:id", verifyToken, function(req,res){
        //console.log(req.params.email);
       
        console.log("User Find and Assign To Update Form");
         //console.log(checkuser);
         try{
          userModel.findById({"_id":req.params.id})
            .then ((users) => {
                res.send((users));
    
            });
            }
            catch(e)
            {
                console.log(e);
                console.log("error");
                res.send(e);
            }
    
        });

module.exports = usersRouter;