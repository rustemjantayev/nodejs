const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/russ', { useNewUrlParser: true }, () => {
    console.log('Conected...');
});

const Course = mongoose.model('Course', {
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        require: true
    }
})
async function createCourse() {
    try {
        const course = new Course({
            name: "Rustem jantayev"
        });

        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
}

createCourse()