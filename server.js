const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./config/ConnectDB");
dotenv.config({ path: "./config/.env" });
app.use(express.json());
const port = process.env.PORT || 5000;

connectdb();
app.use(cors());
app.use("/api/v1", require("./Routes/UserRoutes"));
app.use("/api/v1", require("./Routes/TaskRoutes"));

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server run in ", port);
});
