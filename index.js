const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
require("dotenv").config();


const app = express();


app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cors());

app.use('/', routes);

app.get("/api", (req, res) => {
    res.send('ok')
});

app.listen(process.env.PORT, () => {
	console.log(`[Express] Started on ${process.env.PORT}`);
});

