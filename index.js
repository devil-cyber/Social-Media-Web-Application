const express = require("express");
const app = express();
const port = 8000;
app.use("/", require("./routes"));
app.set("view engine", "ejs");
app.set("views", "./views");





app.listen(port, function(e) {
    if (e) {
        console.log(`Error in creating server:$e`);
    }
    console.log(`Server is running at port:${port}`);
})