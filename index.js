const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRoutes.js");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(
    "Server is running on Port " + PORT + " in mode " + process.env.MODE
  );
});
