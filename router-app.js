const express = require('express');
const db = require('./sql');
const router = express.Router();

router.get('/favorite', (req, res) => {
    db.query(`SELECT * FROM ${req.query.table}`, (err, results, fields) => {
        res.json(results)
    })
})

router.get('/favorite/search', (req, res) => {
    db.query(`SELECT * FROM ${req.query.table} WHERE title='${req.query.title}'`, (err, results, fields) => {
        res.json(results)
    })
})

router.post('/favorite/add', (req, res) => {
    db.query(`INSERT INTO ${req.body.table} (title, img, movieId) VALUES ('${req.body.title}', '${req.body.img}', '${req.body.movieId}');`, (err, results, fields) => {
        res.json(results)
    })
})

router.delete('/favorite/delete', (req, res) => {
    db.query(`DELETE FROM ${req.query.table} WHERE title='${req.query.title}' AND id=${req.query.id} ;`, (err, results, fields) => {
        if (err) {
            console.log('ooops',err)
            res.send(err)
        } else {
            res.json(results)
        }
        
    })
})

module.exports = router;