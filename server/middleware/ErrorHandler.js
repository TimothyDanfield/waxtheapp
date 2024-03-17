const checkErr = require("../config/errorMsg")

const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || checkErr(err).status || 500
    const errMsg = checkErr(err).message || err.message || "Something went wrong"

    res.status(errStatus).send({
        success: false,
        status: errStatus,
        message: errMsg,
        // stack: process.env.NODE === "developmenet" ? err.stack : {}
    })
    console.log(err)
}

const validateBodyParams = (...params) => {
    const middleware = (req, res, next) => {
        for(const param of params) {
            if(!(param in req.body)) {
                return res.status(400).send({ error: `${param} is required`})
            }
        }
        next()
    }
    return middleware
}

module.exports = { ErrorHandler, validateBodyParams }