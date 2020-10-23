var mongoose = require("mongoose");
var {Schema} = mongoose;

var userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    phoneNumber: {type: String},
    profileImage: {type: String}
});

module.exports =  mongoose.model("user", userSchema);