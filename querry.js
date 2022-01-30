const router = require('express').Router();
const Contact = require('./collection/contact');
const bodyParser = require('body-parser');

router.post('/querry', async (req, res) => {

    const querry = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try{
        const savedQuerry = await querry.save();
        res.send(savedQuerry);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;