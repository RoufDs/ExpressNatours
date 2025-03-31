const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

if (process.env.NODE_ENV.trim() === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) // Middleware to parse JSON data from request body
app.use(express.static(`${__dirname}/public`)) // Middleware to serve static files from the public directory

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