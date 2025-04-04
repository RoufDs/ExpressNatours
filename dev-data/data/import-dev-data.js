require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const Tour = require('../../models/tourModel')

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded!')
  } catch (error) {
    console.log(error);
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
  } catch (error) {
    console.log(error);
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}