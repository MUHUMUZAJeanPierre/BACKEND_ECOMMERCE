const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create user 
router.post('/', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            passWordHash: hashedPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        });

        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(400).json({ message: 'User could not be created', success: false });
        }else{
            res.status(201).json({ message: 'User created', success: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (userExist && bcrypt.compareSync(req.body.password, userExist.passWordHash)) {
            const secret = process.env.secret;
            const token = jwt.sign({userExist: userExist}, secret, {expiresIn:"1y"} )
            return res.status(200).send({user: userExist.email, token: token});
        } else {
            return res.status(400).json({ message: 'Password is incorrect', success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});


// Get all users
router.get('/', async (req, res) => {
    try {
        // get all users data minus one data called passWordHash
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});


//get single user

router.get('/:id', async(req,res)=>{
    try {
        //get single user minus one data which is passWordHash
        const getUser = await User.findById(req.params.id).select('-passWordHash');
        if(!getUser){
            return res.status(404).json({message: 'User not fund', success: false});
        }else{
            res.send(getUser);
        }
    } catch (error) {
        res.status(500).json({message:"Error getting user", error:error.message});
    }
});



module.exports = router;
