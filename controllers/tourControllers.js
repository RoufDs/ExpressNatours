const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, val) => {
  const id = req.params.id * 1 // convert string to number
  const tour = tours.find(x => x.id === id)

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    })
    return
  }

  next() // Call the next middleware or route handler
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    })
    return
  }

  next() // Call the next middleware or route handler
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1 // convert string to number
  const tour = tours.find(x => x.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({
    id: newId
  }, req.body)

  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      message: 'New tour added successfully',
      data: {
        tour: newTour,
      },
    })
  })
}

exports.updateTour = (req, res) => {
  const id = req.params.id * 1 // convert string to number
  const tour = tours.find(x => x.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    },
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  })
}