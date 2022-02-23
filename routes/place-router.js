const express = require('express')
const router = express.Router();
const placeCon = require("../controllers/place-con")

// prefix http://localhost:3000/api

router.get('/place-api/:pid', placeCon.getPlaceById)
router.get('/user-api/:uid', placeCon.getUserById)
router.post('/', placeCon.createdPlace)
router.patch('/place-api-update/:pid', placeCon.updatePlace)
router.delete('/place-api-delete/:pid', placeCon.deletePlace)

module.exports = router