const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const couseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 50
        // match: /regular expression/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
        // uppercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result)
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: { 
        type: Number,
        required: function() { return this.isPublished; },
        min: 0,
        max: 1000,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', couseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'giuliano',
        category: 'web',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15.8
    });
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
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

async function updateCourse(id) {

    //Update query first
    //const course = await Course.findById(id);
    //if (!course) return;

    //course.isPublished = true;
    //course.author = 'Another Author';

    //const result = await course.save();

    //console.log(result);

    //Update first
    //const result = await Course.update({ _id: id}, {
    //    $set: {
    //        author: 'giuliano',
    //        isPublished: false
    //    }
    //});
    //console.log(result);


    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: true
        }
    }, {new: true});
    console.log(course);
}

async function removeCourse(id) {
    //const result = await Course.deleteOne({ _id: id});
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}


createCourse();