const express = require('express');
const router = express.Router();
const db = require('./sql');

router.get('/signup/all', (req, res) => {
    db.query(`SELECT * FROM logins WHERE login='${req.query.login}';`, (err, results, fields) => {
        res.json(results)
    })
})

router.post('/signup/create', (req, res) => {
    db.query(`INSERT INTO logins (login, password) VALUES ('${req.body.login}', '${req.body.password}');`, (err, results, fields) => {
        res.json(results)
    })
})

router.post('/signup/createTable', (req, res) => {
    db.query(`CREATE TABLE ${req.body.login} (id INT NOT NULL AUTO_INCREMENT,favourite LONGTEXT NOT NULL,PRIMARY KEY (id));`, (err, results, fields) => {
        res.json(results)
    })
})

module.exports = router;