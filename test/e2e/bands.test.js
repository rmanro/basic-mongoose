const { assert } = require('chai');
const request = require('./request');
const Band = require('../../lib/models/Band');
const { dropCollection } = require('./db');

describe('Band API', () => {

    before(() => dropCollection('bands'));

    let band1 = {
        name: 'Shame',
        location: {
            city: 'London',
            country: 'UK'
        },
        albums: ['Songs of Praise']
    };

    let band2 = {
        name: 'Ought',
        location: {
            city: 'Montreal',
            country: 'Canada'
        },
        albums: ['More than Any Other Day', 'Sun Coming Down', 'Room Inside the World']
    };

    it('POST - saves a band', () => {
        return request.post('/bands')
            .send(band1)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, ...band1 });
                band1 = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('GET - band by ID', () => {
        return Band.create(band2).then(roundTrip)
            .then(saved => {
                band2 = saved;
                return request.get(`/bands/${band2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, band2);
            });
    });

    it('PUT - update a band', () => {
        band1.location.country = 'England';

        return request.put(`/bands/${band1._id}`)
            .send(band1)
            .then(({ body }) => {
                assert.deepEqual(body, band1);
                return Band.findById(band1._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, band1);
            });
    });

    const getFields = ({ _id, name, location }) => ({ _id, name, location });

    it('GET - all bands but list only with ID, Name, and Location', () => {
        return request.get('/bands')
            .then(({ body }) => {
                assert.deepEqual(body, [band1, band2].map(getFields));
            });
    });

    it('GET - queries by name', () => {
        return request.get('/bands?name=Ought')
            .then(({ body }) => {
                assert.deepEqual(body, [band2].map(getFields));
            });
    });
});