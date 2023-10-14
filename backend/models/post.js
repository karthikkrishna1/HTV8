const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    Sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    created: {
        type: Date,
        default: Date.now
      },
    comments: [
        {user: {type:mongoose.Schema.Types.ObjectId,required: true} ,
        text: {type: String,required : true}}
    ]
})
module.exports =  mongoose.model('Post',PostSchema);