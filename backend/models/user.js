const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        trim: true,
        required: 'User_Name is required'
      },
      email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
      },
      hashed_password: {
        type: String,
        required: "Password is required"
      },
      Post:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post"
      },
      image:{
        type:String,
        default:""
      }



})
module.exports =  mongoose.model('User', UserSchema);