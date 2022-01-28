const router = require('express').Router();
const User = require('./collection/User');
const jwt = require('jsonwebtoken'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('./valid');
const { application } = require('express');
// //VALIDATION




router.post('/register', async (req, res) => {

    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    //checking if user is in a database 
    // const emailExist = await User.findOne({email: req.body,eamil});
    // if(emailExist) return res.status(400).send('email is already exists');

    // hash password
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(req.body.password, salt )

//validate what from user
// const validation = Joi.validate(req.body, schema);
// res.send(validation);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    //checking if user is in a database 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('email is wrong');
    //If password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(validPass) return res.status(400).send('Invalid password entered');

    //assignment of json web token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);

    //res.send('logged in');
});

module.exports = router;