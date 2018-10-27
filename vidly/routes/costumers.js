const {Costumer, validate} = require('../models/costumers');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const costumers = await Costumer.find().sort('name');
    res.send(costumers);
});

router.get('/:id', async (req, res) => {
    const costumer = await Costumer.findById(req.params.id);
    if (!costumer) return res.status(404).send('The costumer with the give ID was not found.');
    res.send(costumer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const costumer = new Costumer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    try {
        await costumer.save();
        res.send(costumer);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const costumer = await Costumer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },
    {
        new: true
    });

    if (!costumer) return res.status(404).send('The costumer with the give ID was not found.');

    res.send(costumer);
});

router.delete('/:id', async (req, res) => {
    const costumer = await Costumer.findByIdAndDelete(req.params.id);

    if (!costumer) return res.status(404).send('The genre with the give ID was not found.');
  
    res.send(costumer);
});

module.exports = router;