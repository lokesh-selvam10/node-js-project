const Bootcamp = require('../models/Bootcamp')

const ErrorResponse = require('../utils/errorResponse')
const asyncHandler1 = require('../middleware/async')


//desc      get all bootcamp
//route     api/v1/bootcamps
//access    public
exports.getBootcamps = asyncHandler1(async (req, res, next) => {

    const bootcamp = await Bootcamp.find()
    res.status(200).json({
        success: true,
        data: bootcamp
    })

})

//desc      creating new bootcamp
//route     api/v1/bootcamps/:id
//access    public
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        next(err)
    }
}

//desc      get bootcamp
//route     api/v1/bootcamps
//access    private
exports.getBootcampbyId = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            return next(new ErrorResponse('Bootcamp not found', 404))

        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        next(err)

        // res.status(404).json({ success: false, error: err.message })
    }
}

//desc      update bootcamp
//route     api/v1/bootcamps/:id
//access    private
exports.updateBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        // if (!bootcamp) {
        //     res.status(400).json({ success: false, error: "id not found" })
        // }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        next(err)
    }

}

//desc      delete bootcamp
//route     api/v1/bootcamps/:id
//access    private
exports.deleteBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if (!bootcamp) {
            res.status(400).json({ success: false, error: "id not found" })
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        next(err)
    }
}
