const mongoose =require("mongoose")
const {Schema} = mongoose
const authorSchema = new Schema({
   name:{
    type:String,
    required:true
   },

   details:{
    type:String,
    required:true
   },
   books:[{
     type:Schema.Types.ObjectId,
     ref:"Book"
   }]
})

module.exports=new mongoose.model("Author",authorSchema) 
