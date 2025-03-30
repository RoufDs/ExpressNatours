require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

app.use(morgan('dev'))

app.use(express.json()) // Middleware to parse JSON data from request body

app.use((req, res, next) => {
  console.log('Hello from the middleware!')
  next() // Call the next middleware or route handler;  
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app