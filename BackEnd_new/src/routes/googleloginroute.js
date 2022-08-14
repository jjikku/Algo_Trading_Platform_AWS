const express = require('express'); 
const googleLoginRouter = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../model/users.model");

googleLoginRouter.post("/",function(req,res){
        
    var checkuser = {
           email:req.body.login.email,
           fname:req.body.login.name.split(" ")[0],
           lname:req.body.login.name.split(" ")[1],
           isAdmin:0,
           pwd:""
    };
    console.log("Login router");
     //console.log(checkuser);
     try{
        users.findOne({ "email": checkuser.email }, (error,user) => {
            if(error){
                console.log(error);
            }
            else{
                if(!user)
                {
                    
                var signup = new users(checkuser);
                signup.save((error,user) => {
                    console.log("saved google user");
                    console.log("error= " + error);
                    console.log("new user=" + user);
                    if(error)
                    {
                        console.log(error);
                        res.json({status:true});
                    }
                    else
                    {
                    // let payload = {subject: newuser._id};
                    // let token = jwt.sign(payload,"secretkey");
                    //res.json({status:true}).status(200);
                    let payload = {subject: user._id};
                    console.log("google user id = " + user._id);
                    let token = jwt.sign(payload,"secretkey");
                    res.status(200).send({status:true,fname:user.fname,lname:user.lname,isAdmin:user.isAdmin,token,email:user.email});
                    }

                    });
                }
                else{
                    let payload = {subject: user._id};
                    let token = jwt.sign(payload,"secretkey");
                    res.status(200).send({status:true,fname:user.fname,lname:user.lname,isAdmin:user.isAdmin,token,email:user.email});
                }
            }
        });
    }
       
        catch(e)
        {
            console.log("error");
            res.send(e);
        }

    });
    

module.exports = googleLoginRouter;