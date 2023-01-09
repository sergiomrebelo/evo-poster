const EXPRESS = require("express");
const PATH = require("path");
const FS = require("fs");
const CORS = require('cors');


const APP = EXPRESS();
const PORT = process.env.PORT || "8000";

APP.use(CORS());

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded());

APP.use(EXPRESS.static('public'));

APP.listen(PORT, () => {
    console.log(`👂application running at port ${PORT}`);
});

APP.get("/text/:input", (req, res) => {
   console.log(`${req.params.input}`);
   res.status(200).send(req.params.input);
});

APP.get("*", (req, res) => {
    res.status(404).send(`page not found!`);
});
