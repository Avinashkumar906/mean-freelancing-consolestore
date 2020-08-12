const app = require('express')();
const fileUploader = require('express-fileupload');

// middlewares for internal usage.
app.use(require('cors')())
app.use(require('body-parser').json());

//file handler using express
app.use(fileUploader());

// public folder
app.use('/static',require('express').static('./static'))

//routes
app.use(require('./routes/user'))
app.use(require('./routes/product'))
app.use(require('./routes/order'))

//no route found handler
app.use('',(req,res)=>{
    res.status(200).json({message:"please check the entered route!"})
})

module.exports = app;