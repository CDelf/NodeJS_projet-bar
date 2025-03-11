const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3001;
const barRouter = require("./router/barRouter");

app.use(express.json());
app.use(barRouter);

app.listen(PORT, () => {
    console.log("App listening on port 3000 !");
})