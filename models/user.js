const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
    email: {type: String, unique : true,required:true},
    password: {type: String,required:true},
 }, {timestamps : true})

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
