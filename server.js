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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
})
const Tour = mongoose.model('Tour', tourSchema)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})