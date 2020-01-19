const express = require('express');
const router = express.Router();
const db = require('./sql');

router.get('/signIn', (req, res) => {
    db.query(`SELECT * FROM logins WHERE login='${req.query.login}' AND password='${req.query.password}'`, (err, results, fields) => {
        res.json(results[0])
    })
})

module.exports = router;