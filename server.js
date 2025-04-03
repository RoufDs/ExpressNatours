require('dotenv').config()
const mongoose = require('mongoose')
const app = require("./app");

const DB = process.env.DB_SERVER.replace('<PASSWORD>', process.env.DB_PASSWORD)
mongoose.connect(DB)
  .then(() => {
    if (process.env.NODE_ENV.trim() === 'development') {
      console.log('Connected to MongoDB!');
    }
  }).catch(err => {
    if (process.env.NODE_ENV.trim() === 'development') {
      console.error('Connection error:', err);
    }
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})