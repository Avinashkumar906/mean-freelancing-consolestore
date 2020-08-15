const mongoose = require('mongoose');
const User = require('./models/user')
const app = require('./app')
const bcrypt = require('bcryptjs')

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
                name : process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL.toLowerCase(),
                password:bcrypt.hashSync(process.env.ADMIN_PSWD,10),
                role:process.env.ADMIN_ROLE
            })
            user.save((res)=>console.log(`Admin Registered! check enviroment to view admin email/password`))
        } else {
            console.log(`Admin Registered! check enviroment to view admin email/password`)
        }
        console.log(`Mongodb Up! <br/>`);
    } else{
        console.log(`${err}`);
    } 
});


//Starting server on specified port
app.listen(process.env.PORT,()=>console.log(`Server running at port ${process.env.PORT}<br/>`));