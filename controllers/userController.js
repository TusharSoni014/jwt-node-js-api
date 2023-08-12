const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ message: "all fields are required" })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email: email,
            password: hashedPassword
        })
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY)
        return res.status(201).send({ user: user, accessToken: accessToken })

    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ message: "all fields are required" })
        }
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).send({ message: "user not found !" })
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if (!passwordMatch) {
            return res.status(400).send({ message: "check your password!" })
        }
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET_KEY)
        return res.status(200).send({ user: existingUser, accessToken: accessToken })
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}

module.exports = { login, signup }