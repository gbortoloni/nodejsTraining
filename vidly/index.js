// const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const costumers = require('./routes/costumers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const user = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');

// console.log('Config: ' + config.get('jwtPrivateKey'));

// if(!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/vidly', { useCreateIndex: true, useNewUrlParser: true })
    .then( () => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/costumers', costumers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/', home);

 const port = process.env.PORT || 3000;
 app.listen(port, () => console.log(`Listening on port ${port}...`));