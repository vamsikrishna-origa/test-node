var api = {};
var multer = require("multer");
var user = require("./models/user");
var respObj = require("./respObj");

function validatePhone(str) {
    if(!str){
        return false;
    }
    var regex = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
    return regex.test(str);
}

//creating user
api.create = function(req, res) {
    var body = req.body;
    if(!validatePhone(body.phoneNumber)) {
        respObj.error.message = "Invalid Phone Number";
        return res.json(respObj.error);
    }
    
    var userObj = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        profileImage: body.imageFilePath
    }
    let userModel = new user(userObj);
    userModel.save().then((doc) => {
        respObj.success.message = "User Saved Successfully";
        respObj.success.data = doc;
        return res.json(respObj.success);
    }).catch((err) => {
        respObj.error.message = err.message;
        return res.json(respObj.error);
    });
}

//fetching users
api.fetch = async function(req, res) {
    var id = req.params.id;
    var query = {};
    if(id != "all") {
        query = {_id: id}
    }
    user.find(query).then((doc) => {
        respObj.success.message = "Users retrieved successfully";
        respObj.success.data = doc;
        return res.json(respObj.success);
    }).catch((err) => {
        respObj.error.message = err.message;
        return res.json(respObj.error);
    });
}

//update user
api.update = function(req, res) {
    var id = req.params.id;
    var userObj = req.body.user
    user.update({_id: id}, {$set: userObj}).then((doc) => {
        respObj.success.message = doc.n === 0 ? "User not found" : 
        "User updated successfully";
        respObj.success.data = null;
        return res.json(respObj.success);
    }).catch((err) => {
        respObj.error.message = err.message;
        return res.json(respObj.error);
    })
}

//delete user
api.delete = function(req, res) {
    var id = req.params.id;
    var userObj = req.body.user
    user.deleteOne({_id: id}).then((doc) => {
        respObj.success.message = doc.n === 0 ? "User not found" : 
        "User deleted successfully";
        respObj.success.data = null;
        return res.json(respObj.success);
    }).catch((err) => {
        respObj.error.message = err.message;
        return res.json(respObj.error);
    })
}

module.exports = api;