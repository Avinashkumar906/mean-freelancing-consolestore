const User = require('../models/user');
const { findByIdAndDelete } = require('../models/user');

module.exports = {
    getUser:async (req, res, next) => {
        try {        
            // fetching data from mongoDB
            const email = req.body.email.toLowerCase()
            const user = await User.find();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getUsers:async (req, res, next) => {
        try {        
            // fetching data from mongoDB
            const users = await User.find({},{password:0});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser:async (req, res, next) => {
        try {        
            const {_id} = req.query
            let user = await User.findByIdAndDelete(_id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    toggleRole:async (req, res, next) => {
        try {        
            // fetching data from mongoDB
            const {_id} = req.query
            let user = await User.findById(_id);
            user.role = user.role === 'admin' ? 'visitor' : 'admin'; 
            await user.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    postSignUp:async (req, res, next) => {
        try {  
            const email = req.body.email.toLowerCase()
            let userfound = await User.findOne({ email: email})
            if(userfound) 
                res.status(500).json({message:'user with email already exist!'})
            else{
                let user = new User({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                })
                await user.save();
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    postSignIn:async (req, res, next) => {
        try {  
            const { email,password} = req.body
            let userfound = await User.findOne({ email: email.toLowerCase(),password: password})
            if(!userfound) 
                res.status(500).json({message:'Incorrect username and password!'})
            else{
                let obj = new Object({
                    name:userfound.name,
                    email:userfound.email,
                    role:userfound.role
                })
                res.status(200).json(obj)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }            
}