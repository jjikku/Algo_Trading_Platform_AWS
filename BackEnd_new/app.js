const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRouter = require("./src/routes/loginroute");
const googleLoginRouter = require("./src/routes/googleloginroute");
const signupRouter = require("./src/routes/signuproute");
const homeRouter = require("./src/routes/homeroute");
const strategyRouter = require("./src/routes/strategyroute");
const singleStrategyRouter = require("./src/routes/singlestrategyroute");
const deployRouter = require("./src/routes/deployroute");

const usersRouter = require("./src/routes/usersroute");
const singleUserRouter = require("./src/routes/singleuserroute");
const editUsersRouter = require("./src/routes/editusersroute");
const UserPurchaseRoutes = require("./src/routes/userpurchase");

require("dotenv").config();

const app = new express();

// Global objects

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/login", loginRouter);
app.use("/", loginRouter);

app.use("/googlelogin", googleLoginRouter);

app.use("/signup", signupRouter);
app.use("/strategy", strategyRouter);
app.use("/singlestrategy", singleStrategyRouter);
app.use("/deploy", deployRouter);
app.use("/userpurchase", UserPurchaseRoutes);

app.use("/users", usersRouter);

app.use("/singleuser", singleUserRouter);
app.use("/edituser", editUsersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Ready on ${PORT}`);
});
