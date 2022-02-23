const HttpError = require("../models/http-error")
const User = require("../models/user")

const getUsers = (async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    }
    catch (error) {
        const err = new HttpError("Login falied", 500);
        return next(err);
    }
    res.json({ users })
})

const signup = (async (req, res, next) => {
    const { name, email, password, places } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    }
    catch (error) {
        const err = new HttpError("Error", 500);
        return next(err);
    }

    const createdUser = new User({
        name,
        email,
        password,
        places
    });

    try {
        await createdUser.save();
    }
    catch (error) {
        const err = new HttpError("Signup fail", 500);
        return next(err);
    }
    res.status(201).json({ user: createdUser })
})

const login = (async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    }
    catch (error) {
        const err = new HttpError("Login falied", 500);
        return next(err);
    }

    if (!existingUser || existingUser.password !== password) {
        const err = new HttpError("Invalid username/password", 500);
        return next(err);
    }
    res.json({ message: "Login boyyy" })
})

exports.getUsers = getUsers
exports.signup = signup
exports.login = login