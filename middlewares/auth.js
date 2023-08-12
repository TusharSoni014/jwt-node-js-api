const User = require('../model/userModel')
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        let authHeaders = req.headers.authorization
        if (!authHeaders) {
            return res.status(401).send({ message: "access denied, token is required." })
        }
        let token = authHeaders.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(500).send({ message: "something went wrong" })
    }
}

module.exports = {auth}