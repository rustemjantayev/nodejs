const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Course, validate } = require('../models/course');

router.get('/', async(req, res) => {
    try {
        const course = await Course.find({});
        if (!course) return res.status(404).send('The is no Courses...');
        res.send(course);
    } catch (err) {
        res.status(404).send(err.message)
    }
})

// get course by id
router.get('/:id', async(req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        if (!course) return res.status(404).send("Did not find the course with _id:", req.params.id);

        res.send(course);
    } catch (err) {
        res.status(404).send(err.message);
    }
    res.send('course by id');
})

// create course
router.post('/', async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const course = new Course(req.body);
        const result = await course.save();

        res.send(result);
    } catch (err) {
        res.status(404).send(err.message);
    }

})

// update course
router.put('/:id', async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let course = await Course.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!course) return res.status(404).send("Did not find the course...");

        res.send(course);
    } catch (err) {
        res.send(err.errors);
    }

});
// delete coutse
router.delete('/:id', async(req, res) => {
    try {
        const course = await Course.findByIdAndDelete({ _id: req.params.id });
        if (!course) return res.status(404).send("Not found ...");

        res.send(course);
    } catch (err) {
        res.status(404).send(err.message);
    }
});




module.exports = router;