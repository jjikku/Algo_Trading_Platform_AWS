const express = require("express");
const singleStrategyRouter = express.Router();
const strategyModel = require("../model/strategy.model")
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
    singleStrategyRouter.get("/:id", verifyToken, function(req,res){
        //console.log(req.params.email);
            
        
        console.log("ID Strategy router");
         //console.log(checkuser);
         try{
            strategyModel.find({"_id":req.params.id})
            .then ((strategy) => {
                console.log(strategy);
                res.send(strategy);
    
            });
            }
            catch(e)
            {
                console.log(e);
                console.log("error");
                res.send(e);
            }
    
        });
      
        singleStrategyRouter.delete("/:id", verifyToken, function(req,res){
            //console.log(req.params.email);
                
            
            console.log("Strategy delete router");
             //console.log(checkuser);
             try{
                const id = req.params.id;
                strategyModel.findOneAndDelete({ _id: id })
                    .then(function () {
                        res.send(req.body);

                });                
                }
                
                catch(e)
                {
                    console.log(e);
                    console.log("error");
                    res.send(e);
                }
        
            });
          

module.exports = singleStrategyRouter;
