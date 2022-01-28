const Joi = require('@hapi/joi');
const express = require('express');
const req = require('express/lib/request');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./collection/blogs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const postRoute = require('./collection/post');
dotenv.config();

const port = process.env.PORT || 5000;

const authRoute = require('./authentication');

// middle wares
app.use(bodyParser.json()); 
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


//connecting to db
const dbURI = process.env.DB_CONNECT; 
mongoose.connect(dbURI)
.then((result) => console.log('connect to db'))
.catch((err) => console.log(err));
app.use(express.json());

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'second article',
        snippet: 'about my second article',
        body: 'welcome guys on my second article'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);n
    });
})

app.get('/articles', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/one-article', (req, res) => {
    Blog.findById()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})

const datas = [
    { id:1 , name: 'new blog', comment: ''},
    { id:2 , name: 'data2' },
    { id:3 , name: 'data3' },
]

app.get('/', (req, res) => {
    res.send('The first backend');
});

app.get('/api/datas', (req, res) => {
    res.send(datas);
});

// app.post('/api/datas', (req, res) => {
//     const { error } = validateCourse(req.body);
//     if(error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     const data = {
//         id: datas.length +1,
//         name: req.body.name
//     };
//     datas.push(data);
//     res.send(data);
// });

app.post('/articles', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.put('/api/datas/:id', (req, res) => {
    const data = datas.find(c => c.id === parseInt(req.params.id));
    if(!data) res.status(404).send("Your request with given ID is not found");

   
    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    data = req.body.name;
    res.send(data);
});

function validateCourse(data) {
    const schema = {
        name: Joi.string().min(3).required()
    };
   return Joi.validate(data, schema);
}

app.delete('/api/datas/:id', (req, res) => {
    const data = datas.find(c => c.id === parseInt(req.params.id));
    if(!data) res.status(404).send("Your request with given ID is not found");

    const index = datas.indexOf(data);
    datas.splice(index, 1);

    res.send(data);
});

// app.get('/api/datas/:id', (req, res) => {
//    const data = datas.find(c => c.id === parseInt(req.params.id));
//    if(!data) res.status(404).send("Your request with given ID is not found");
//    res.send(data);
// });

app.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
 });

 app.put('/articles/:id', (req, res) => {
     const id = req.params.id;
     Blog.findByIdAndUpdate(id)
     const blog = new Blog(req.body);

     blog.save()
     .then((result) => {
         res.send('article updated')
     })
     .catch((err) => {
         console.log(err);
     })
 });

 app.delete('/articles/:id', (req, res) => {
     const id = req.params.id;
     Blog.findByIdAndDelete(id)
     .then(result => {
         res.send('blog deleted successfully!!')
         })
         .catch(err => {
             console.log(err);
         })
     });



app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});