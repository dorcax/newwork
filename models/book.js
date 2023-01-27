const mongoose=require("mongoose")
const {Schema} = mongoose
const bookSchema = new Schema({
     title:{
        type:String,
        required:true
    
     },
     booktype:{
        type:String,
        required:true
     },
     genres:{
        type:String,
        required:true
     },
     booklanguage:{
        type:String,
        required:true
     },
     bookdesc:{
        type:String,
        required:true
     },
     authors:[{
        type:Schema.Types.ObjectId,
        ref:"Author"
     }]

})
module.exports = mongoose.model("Book",bookSchema)