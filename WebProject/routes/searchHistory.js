const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Save search term to session
router.post('/search-history', (req, res) => {
    const { term } = req.body;
    if (!req.session.searchHistory) {
        req.session.searchHistory = [];
    }
    if (!req.session.searchHistory.includes(term)) {
        req.session.searchHistory.push(term);
    }
    res.status(200).send();
});

// Get search history from session
router.get('/search-history', (req, res) => {
    res.status(200).json(req.session.searchHistory || []);
});

module.exports = router;
