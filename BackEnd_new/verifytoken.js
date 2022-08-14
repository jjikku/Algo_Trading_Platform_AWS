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

 module.export = verifyToken;