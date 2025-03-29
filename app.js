require('dotenv').config()
const express = require('express')

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Hello from the server!',
    });
})

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})