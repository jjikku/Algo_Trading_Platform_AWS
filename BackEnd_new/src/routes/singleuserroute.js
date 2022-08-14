const express = require("express");
//const singleBookRouter = express.Router();
const singleUserRouter = express.Router();
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");

function verifyToken(req,res,next) {
    const auth =  req.headers['authorization'];
    console.log("auth = " + auth);
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
 singleUserRouter.get("/:id", verifyToken, function(req,res){
        //console.log(req.params.email);
        console.log("Single User Find(Single User router...)");
         try{
            // userModel.find({"_id":req.params.id})
            userModel.findById({"_id":req.params.id})
            .then ((user) => {
                // console.log(user);
                res.send(user);
    
            });
            }
            catch(e)
            {
                console.log(e);
                console.log("error");
                res.send(e);
            }
    
        });

        singleUserRouter.post("/block/:id", verifyToken, function (req, res) {

            var editedUser = {
                blockstatus:1              
            };
            console.log(req.params.id);
            userModel.findByIdAndUpdate(
              req.params.id, { $set: editedUser },{new:true},
              function (err, data) {
                if (err) {
                  res.status(401).send(err);
                } else {
                  res.send(data);
                }
              }
            );
          });        
          singleUserRouter.post("/unblock/:id", verifyToken, function (req, res) {

            var editedUser = {
                blockstatus:0              
            };
            console.log(req.params.id);
            userModel.findByIdAndUpdate(
              req.params.id, { $set: editedUser },{new:true},
              function (err, data) {
                if (err) {
                  res.status(401).send(err);
                } else {
                  res.send(data);
                }
              }
            );
          });     
        // singleUserRouter.delete("/:id", verifyToken, function(req,res){
        //     //console.log(req.params.email);

        //     console.log("User Route For Delete (Single User Router)");
             
        //      try{
        //         const id = req.params.id;
        //         userModel.findOneAndDelete({ _id: id })
        //             .then(function () {
        //                 res.send(req.body);

        //         });                
        //         }
                
        //         catch(e)
        //         {
        //             console.log(e);
        //             console.log("error");
        //             res.send(e);
        //         }
        
        //     });
          

module.exports = singleUserRouter;
