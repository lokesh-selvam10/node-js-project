const asyncHandler = fun => (req, res, next) => {
    console.log("res")
    Promise.resolve(fun(req, res, next)).catch(next)
}

const asyncHandler1 = function (fun) {
    return function (req) {

        return function (res) {
        console.log("1inside")

            return function (next) {
                console.log("2inside")
            }
        }
    }
}
module.exports = asyncHandler1