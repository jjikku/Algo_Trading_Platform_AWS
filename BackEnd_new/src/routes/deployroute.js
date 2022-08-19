const express = require("express");
const deployRouter = express.Router();
const strategyModel = require("../model/strategy.model");
const { execution_engine } = require("../cep/execution_engine");
const jwt = require("jsonwebtoken");

//const { verifyToken } = require('../../verifytoken');
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
deployRouter.get("/exit", function (req, res) {
    exitRoute = 1;
    
    console.log("exitRoute = " + exitRoute);
    return res.status(200).json({
      message: "Exited all positions",
    });
});

 //deployRouter.get("/:id", verifyToken, function(req,res){
deployRouter.get("/execute/:id", function (req, res) {
    exitRoute = 0;
    apiError = 0;
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
   "Access-Control-Allow-Origin": "*",
  //  "X-Accel-Buffering": "no",

  };
  
  res.writeHead(200, headers);
  //res.setHeader("Content-Type", "text/event-stream");

  console.log(req.originalUrl);
  console.log("Deploy router");

  //console.log(checkuser);
  try {
    let strategyId = req.params.id;
    //console.log(strategyId);
    strategyModel.findById(strategyId).then((strategy) => {
      if (!strategy) {
        return res.status(400).json({
          message: "There is no strategy with the given id in our database.",
        });
      } else {
        console.log("execution engine call");
        console.log(strategy.strategy);
        new Object(execution_engine(strategy.strategy,res));

        console.log("execution engine called");
        //res.status(200).json(strategy.strategy);
      }
    });
  } catch (e) {
    console.log(e);
    console.log("error");
    res.send(e);
  }
});

module.exports = deployRouter;
