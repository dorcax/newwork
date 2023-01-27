const Joi =require("joi")
module.exports.bookschema =Joi.object({

        title:Joi.string().required(),
        booktype:Joi.string().required(),
        booklanguage:Joi.string().required(),
        genres:Joi.string().required(),
        bookdesc:Joi.string().required(),
        
        
    }).required()
module.exports.authorschema=Joi.object({
        name:Joi.string().required(),
        details:Joi.string().required(),
}).required()   
