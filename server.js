const express =require("express")
const app =express()
const mongoose =require("mongoose")
const methodoverride =require("method-override")
const port =process.env.port||3000
const path =require("path")
const Author =require("./models/authorSchema")
const {bookschema,authorschema} = require("./schema.js")
const Book =require("./models/book")
const ExpressError =require("./ExpressError")
const Joi =require("joi")
mongoose.connect("mongodb://localhost:27017/authorapp",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connection opened")
})
.catch((err)=>{
    console.log(`oh is error!!!, ${err}`)
})
// app.set("views",path.join(__dirname +"views")
app.set("views",path.join(__dirname,'views'))

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
const validate = (req,res,next)=>{
    const {error} =bookschema.validate(req.body);
    // console.log(error)
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,404)
    }  else{
        next();
    }

}
const validateauthor = (req,res,next)=>{
    const {error} =authorschema.validate(req.body);
    // console.log(error)
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,404)
    }  else{
        next();
    }

}
//route for author details
app.get("/author",async(req,res)=>{
    const findauthor = await Author.find({})
     res.render("author/index.ejs",{findauthor})
})

// route for author registration form
app.get("/author/new",(req,res)=>{
    const {id}=req.params
    res.render("author/form.ejs",{id})
})
app.post("/author",validateauthor,async(req,res)=>{
    const{id} =req.params
    const newauthor = new Author(req.body)
    await newauthor.save()
    res.redirect(`/author`)
})
app.get("/author/:id",async(req,res)=>{
    const {id} =req.params
    const showauthor = await Author.findById(id).populate("books")
    res.render("author/showpage.ejs",{showauthor})

})

// author and thier book route
app.get("/author/:id/books/new",(req,res)=>{
    const {id} =req.params
    res.render("book/form.ejs",{id})
})
app.post("/author/:id/books", validate,async(req,res)=>{
    const{id} =req.params
    const findauthor=await Author.findById(id)
    const {title,booktype,genres,booklanguage,bookdesc}=req.body
    const newbook =new Book({title,booktype,genres,booklanguage,bookdesc})     
    findauthor.books.push(newbook)
    newbook.authors=findauthor
    await findauthor.save()
    await newbook.save()
    res.redirect(`/author`)
 
})

app.use((err,req,res,next)=>{
    const{statuscode =505} =err
    if(!err.message) err.message="oh no something went wrong"
    res.status(statuscode).render("error",{err})
 })


app.use((err,req,res,next)=>{   
    res.status(501).send("oh boy something went wrong")
})


app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})