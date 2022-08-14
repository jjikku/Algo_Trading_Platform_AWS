const express = require("express");
const strategyRouter = express.Router();
const strategyModel = require("../model/strategy.model");
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



strategyRouter.post("/addstrategy", function (req, res) {
  exitRoute = 1;

    var newstrategy = {
      stratname:req.body.strat.stratname,
      strategy:req.body.strat.strategy,
      about:req.body.strat.about,
      emailid:req.body.strat.useremailid
      
     };

    console.log("strategy route")
    console.log(req.body);
    var addstrategy= new strategyModel(newstrategy);
    addstrategy.save();
    res.send(req.body);
  });

   strategyRouter.get("/",verifyToken, function(req,res){
    //console.log(req.params.email);
    //booksRouter.get("/", function(req,res){
    exitRoute = 1;

    console.log(req.originalUrl);
    console.log("root strategy router");
     //console.log(checkuser);
     try{
        strategyModel.find({})
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
  
    // strategyRouter.get("/:id", verifyToken, function(req,res){
      strategyRouter.get("/:id", function (req, res) {
        //console.log(req.params.email);
        //booksRouter.get("/", function(req,res){
        console.log(req.originalUrl);
        console.log("id Strategy router");
        //console.log(checkuser);
        try {
          let strategyId = req.params.id;
              //let strategyId = '62dfa9e2f7f2bc1d6f601e47';
              //console.log(strategyId);
                  strategyModel.findById(strategyId).then((strategy) => {
                  if (!strategy) {
                      return res.status(400).json({
                          message: 'There is no strategy with the given id in our database.'
                      });
                  }
                  else{
                    console.log(strategy);
                    res.send(strategy);
                  }
        }) 
      }
      catch (e) {
          console.log(e);
          console.log("error");
          res.send(e);
        }
      });
      
      strategyRouter.delete("/:id", verifyToken, function(req,res){
        console.log("stratgey delete router");
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
                res.send(e);
            }
      });
        
        strategyRouter.post("/edit/:id", function (req, res) {
  
          var editedstrategy = {
            stratname: req.body.strategy.stratname,
            strategy: req.body.strategy.strategy,
            about: req.body.strategy.about
          };
         
          //var editedstrategyNEW = new strategyModel(editedstrategy);
          //console.log(editedstrategy)
          //console.log(req.params.id)

          strategyModel.findByIdAndUpdate(
            req.params.id,
            { $set: editedstrategy },
            function (err, data) {
              if (err) {
                res.status(401).send(err);
                console.log(err)
              } else {
                res.send(data);
                console.log(data);
              }
            }
          );
        })

  strategyRouter.get("/ByUserId/:id&:isadmin", function (req, res) {
    try {
          const emailidno = req.params.id;
          const isadmin = req.params.isadmin;
          console.log(emailidno, isadmin);

          if(isadmin == "1") {
            console.log("isadmin 1")
            strategyModel.find({}).then((strategy) => {

              if (!strategy) {
                    return res.status(400).json({
                    message: 'There is no strategy for this user'
                  });
                  }
              else{
                    res.send(strategy);
                  }
            }) 
          }
          else{
            strategyModel.find({emailid: emailidno}).then((strategy) => {
            if (!strategy) {
                  return res.status(400).json({
                  message: 'There is no strategy for this user'
                });
                }
            else{
                  res.send(strategy);
                }
          }) 
        }
      }
      catch (e) {
        res.send(e);
      }
    })

module.exports=strategyRouter;