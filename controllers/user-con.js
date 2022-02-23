const uuid = require('uuid');
const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")
const users = [
    {
        uid: uuid.v4(),
        id: "u1",
        name: "temp",
        email: "test@test.com",
        password: "temp"
    }
]


const getUsers = ((req, res, next) => {
    res.json({ users: users })
})
const signup = ((req, res, next) => {
    const { name, email, password } = req.body;

    const createdUser = {
        id: uuid.v4(),
        name,
        email,
        password
    }
    users.push(createdUser)
    res.status(201).json({ user: createdUser })
})
const login = ((req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new HttpError("Invalid input", 422)
    }
    const { email, password } = req.body;

    const identified = users.find(u => u.email === email)

    if (!identified || identified.password !== password) {
        throw new HttpError("Nathi kahi aaya", 401)
    }
    res.json({ message: "Login boyyy" })
})

exports.getUsers = getUsers
exports.signup = signup
exports.login = login