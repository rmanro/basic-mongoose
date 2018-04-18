const router = require('express').Router();
const Band = require('../models/Band');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Band.create(req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    });