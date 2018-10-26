const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect("mongodb+srv://taipham:HqT79pa8qQVFOvkM@cluster0-h7kvi.mongodb.net/test?retryWrites=true")
    .then(() => {
    console.log("connected to database!")
  })
    .catch (() => {
      console.log("connect fail");
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.get("/", (req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added sucessfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched sucessfully!',
      posts: documents
    });
  });


});

// app.use((req, res, next) => {
//   res.send('Hello from express');
// });

module.exports = app;
