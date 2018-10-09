const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const couseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', couseSchema);

async function createCourse() {
    const course = new Course({
        name: 'NodeJs Course',
        author: 'giuliano',
        tags: ['node', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
//lt (less than)
//lte (less than or equal to)
//in
//nin (not in)

    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course


    //Comparison Query Operators
    //.find({ price: { $gte: 10, $lte: 20} })
    //.find({ price: { $in: [10,15,20] } })

    //Logical Query Operators
    //.find()
    //.or([ { author: 'giuliano' }, { isPublished: true } ])
    //.and([])

    //Regular Expression
    //Starts with giuliano
    //.find({ author: /^giuliano/})

    //Ends with bortoloni
    //.find({ author: /bortoloni$/i /*i case insensitive*/})

    //Contains giuliano
    //.find({ author: /.*giuliano.*/i /*case insensitve*/})

    .find({ author: 'giuliano', isPublished: true})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    //Count
    //.count()
    console.log(courses);
    
}

getCourses();