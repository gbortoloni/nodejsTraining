const auth = require('../middleware/auth');
const {Movie, validate} = require('../models/movies');
const {Genre} = require('../models/genres');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.get('/:id', auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the give ID was not found.');
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try {
        await movie.save();
        res.send(movie);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    },
    {
        new: true
    });

    if (!movie) return res.status(404).send('The movie with the give ID was not found.');

    res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
    const movie = await movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).send('The movie with the give ID was not found.');
  
    res.send(movie);
});

module.exports = router;