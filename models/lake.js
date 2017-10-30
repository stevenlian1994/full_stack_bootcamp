var mongoose = require("mongoose");

var lakeSchema = mongoose.Schema({
    name: String,
    image: String
    
});



module.exports = mongoose.model("Lakes", lakeSchema);