const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRoutes.js");
const messageRoute = require("./routes/messageRoute.js");
const connectDb = require("./utils/connectDb.js");

const PORT = process.env.PORT || 4000;
connectDb();

app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", messageRoute);

app.listen(PORT, () => {
  console.log(
    "Server is running on Port " + PORT + " in mode " + process.env.MODE
  );
});
