const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.headers["x-access-token"]
    if(!token) {
        return res.status(403).send({ error: "A token is required for authentication" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (error) {
        console.log(error)
        return res.status(400).send("Invalid Token")
    }
    next()
}

module.exports = verifyToken