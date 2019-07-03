const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const courses = require('./services/courses');

mongoose.connect('mongodb://localhost/russ', { useNewUrlParser: true }, () => {
    console.log('Connected .... ');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));

app.use('/api/courses', courses);

app.listen(80, () => {
    console.log('listen 80 port...');
});