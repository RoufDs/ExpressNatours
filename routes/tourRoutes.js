const express = require('express')
const { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats } = require('../controllers/tourControllers')

const router = express.Router()

// router.param("id", checkId)

router
  .route('/top-5-cheap')
  .get(aliasTopTours, getAllTours)

router
  .route('/tour-stats')
  .get(getTourStats)

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router