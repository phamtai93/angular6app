const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log("post /api/posts");
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
