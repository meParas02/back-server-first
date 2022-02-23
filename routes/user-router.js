const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const userCon = require("../controllers/user-con")

router.get('/', userCon.getUsers)
router.post('/signup', userCon.signup)
router.post('/login', [check('email').not().isEmpty(), check('password').not().isEmpty()], userCon.login)

module.exports = router