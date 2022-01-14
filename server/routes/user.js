const express = require('express');
const router = express.Router();

// Add an initial route
router.get('', (req, res) => {
    res.render('home');
});

module.exports = router;