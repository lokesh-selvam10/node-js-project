const express = require('express')
const router = express.Router()
const { getBootcamps, createBootcamp, getBootcampbyId, updateBootcamps, deleteBootcamps } = require('../controllers/bootcamps')

router.route('/:id').get(getBootcampbyId).delete(deleteBootcamps).put(updateBootcamps)
router.route('/').get(getBootcamps).post(createBootcamp)

module.exports = router