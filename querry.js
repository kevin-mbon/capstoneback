const router = require('express').Router();
const Contact = require('./collection/contact');
const bodyParser = require('body-parser');
const { append } = require('express/lib/response');

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

router.get('/querry', (req, res) => {
    Contact.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.delete('/querry/:id', (req, res) => {
    const id = req.params.id;
    Contact.findByIdAndDelete(id)
    .then((result) => {
        res.send('query deleted successfully')
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;