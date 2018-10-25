const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added sucessfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  console.log('first middleware');
  const posts = [
    {
      id: '123',
      title: "First server-side post",
      content: "This is comming from the sever"
    },
    {
      id: '234',
      title: "Second server-side post",
      content: "This is comming from the sever"
    }

  ];
  res.status(200).json({
    message: 'Posts fetched sucessfully!',
    posts: posts
  });
});

// app.use((req, res, next) => {
//   res.send('Hello from express');
// });

module.exports = app;
