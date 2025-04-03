const Tour = require('../models/tourModel')

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1 // convert string to number
  // const tour = tours.find(x => x.id === id)

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour,
  //   },
  // })
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create({ ...req.body })

    res.status(201).json({
      status: 'success',
      message: 'New tour added successfully',
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
      error: error.message,
    })
  }
}

exports.updateTour = (req, res) => {
  const id = req.params.id * 1 // convert string to number

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