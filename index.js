const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//middleware
app.use(express.urlencoded());
app.use(cookieParser());





app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static("./assets"));
app.use(expressLayouts);
app.use("/", require("./routes"));
app.set("view engine", "ejs");
app.set("views", "./views");





app.listen(port, function(e) {
    if (e) {
        console.log(`Error in creating server:$e`);
    }
    console.log(`Server is running at port:${port}`);
})