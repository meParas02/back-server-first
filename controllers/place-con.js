const uuid = require('uuid');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const Place = require('../models/place');
const HttpError = require('../models/http-error');

const getPlaceById = (async (req, res, next) => {
    const placeId = req.params.pid
    let place;
    try {
        place = await Place.findById(placeId)
    }
    catch (error) {
        const err = new HttpError("Error", 500);
        return next(err);
    }
    if (!place) {
        const error = new Error("Could not find place page")
        error.code = 404;
        return next(error);
        // or
        // const error = new HttpError("Could not find place page", 404)
        // or
        // return res.status(404).json({ message: "Page not find" })
    }
    res.json({ place });
    // res.json({ place: place.toObject({ getters: true }) });
})

const getUserById = (async (req, res, next) => {
    const userId = req.params.uid
    let place;
    try {
        place = await Place.find({ creator: userId });
    } catch (error) {
        const err = new HttpError("Error", 500);
        return next(err);
    }

    if (!place) {
        const error = new Error("Could not find user page")
        error.code = 404;
        throw error
    }
    else {
        res.json({ place });
    }
})

const createdPlace = (async (req, res, next) => {
    const { title, description, address, creator } = req.body;
    const creatPlace = new Place({
        title,
        description,
        address,
        creator
    });
    try {
        await creatPlace.save();                              //mongoose method
        res.status(201).json({ place: creatPlace })
    } catch (error) {
        const err = new HttpError("Error", 500);
        return next(err);
    }
})

const updatePlace = (async (req, res, next) => {
    const { title, description, address, creator } = req.body
    const placeId = req.params.pid
    let place;
    try {
        place = await Place.findById(placeId)
    }
    catch (error) {
        const err = new HttpError("Not update", 500);
        return next(err);
    }
    place.title = title
    place.description = description
    place.address = address
    place.creator = creator
    try {
        await place.save();
    } catch (error) {
        const err = new HttpError("Error", 500);
        return next(err);
    }
    res.status(200).json({
        place: updatePlace
    });
})

const deletePlace = (async (req, res, next) => {
    const placeId = req.params.pid
    let place;
    try {
        place = await Place.findById(placeId)
    }
    catch (error) {
        const err = new HttpError("Somthing want wrong", 500);
        return next(err);
    }
    try {
        await place.remove();
    } catch (error) {
        const err = new HttpError("Error", 500);
        return next(err);
    }
    res.status(200).json({ message: "delete data" });
})


exports.getPlaceById = getPlaceById;
exports.getUserById = getUserById;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.createdPlace = createdPlace;
