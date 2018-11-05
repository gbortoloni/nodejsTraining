const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, (req, res) => {
    res.send('Welcome to the Vidly!');
});

module.exports = router;