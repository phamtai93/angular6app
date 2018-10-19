const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

// app.use((req, res, next) => {
//   res.send('Hello from express');
// });

module.exports = app;
