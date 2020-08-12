const mongoose = require('mongoose');
const User = require('./models/user')
const app = require('./app')

//Setting enviroment variables
if(!process.env.PORT){
    require('dotenv').config();
}

//mongo setup
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true},async (err)=>{
    // for admin user registration code
    if(!err){
        let user = await User.findOne({email:process.env.ADMIN_EMAIL})
        if(!user){
            user = new User({
                name : "ADMIN",
                email: process.env.ADMIN_EMAIL.toLowerCase(),
                password:process.env.ADMIN_PSWD,
                role:"admin"
            })
            user.save((res)=>console.log(`Admin mail: ${user.email},Admin Password: ${user.password}`))
        } else {
            console.log(`Admin mail: ${user.email},Admin Password: ${user.password}`)
        }
        console.log(`Mongodb Up! <br/>`);
    } else{
        console.log(`${err} <br/>`);
    } 
});


//Starting server on specified port
app.listen(process.env.PORT,()=>console.log(`Server running at port ${process.env.PORT}<br/>`));