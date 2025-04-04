const Tour = require('../models/tourModel')

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    let query = Tour.find(JSON.parse(queryStr))

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    const tours = await query

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })

  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })

  }
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })

  }
}

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      })
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })

  }
}