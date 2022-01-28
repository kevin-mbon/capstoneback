const router = require('express').Router();
const verify = require('../verify');

router.get('/posts', verify, (req, res) => {
    res.json({posts: {tittle: 'This is for test', description: 'more details goes here '}});
});

module.exports = router;