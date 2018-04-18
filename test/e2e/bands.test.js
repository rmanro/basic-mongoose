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
            country: 'England'
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
});