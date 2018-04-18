const router = require('express').Router();
const Band = require('../models/Band');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Band.create(req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Band.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
        })
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Band.findById(id)
            .lean()
            .then(band => {
                if(!band) {
                    errorHandler({
                        status: 404,
                        error: `Band ID ${id} Does Not Exist`
                    }, req, res);
                }
                else res.json(band);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Band.find(req.query)
            .lean()
            .select('name location')
            .then(bands => {
                res.json(bands);
            })
            .catch(err => errorHandler(err, req, res));
    });