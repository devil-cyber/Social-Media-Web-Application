const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/final_backend_db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in coonecting database"));
db.once("open", function() {
    console.log("Connected Sucessfully to Database MongoDB");
});




module.exports = db;