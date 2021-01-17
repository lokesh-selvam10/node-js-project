const ErrorResponse = require("../utils/errorResponse")

const errorHaldler = (err, req, res, next) => {
    error = { ...err }
    error.message = err.message
    console.log('errorhandler')
    // console.log(err.keyValue['name'])

    if (err.name === 'CastError') {
        error = new ErrorResponse(`Bootcamp not found with id ${err.value}`, 404)
    }
    if (err.code === 11000) {
        const duplicate = err.keyValue
        const duplicateKey = Object.keys(duplicate)
        const duplicateValue = err.keyValue[duplicateKey]
        error = new ErrorResponse(`Bootcamp already added with ${duplicateKey} ${duplicateValue}`, 400)
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message
    })
}

module.exports = errorHaldler