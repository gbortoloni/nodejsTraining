const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

 const genres = [
     {id: 1, genre: 'Horror'},
     {id: 2, genre: 'Suspense'},
     {id: 3, genre: 'Action'}
 ]

app.get('/', (req, res) => {
    res.send('Welcome to the Vidly!');
});

 app.get('/api/genres', (req, res) => {
    res.send(genres);
 });

 app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the give ID was not found.');
    res.send(genre);
 });

 app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
 });

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the give ID was not found.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the give ID was not found.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

 const port = process.env.PORT || 3000;
 app.listen(port, () => console.log(`Listening on port ${port}...`));