const { assert } = require('chai');
const Band = require('../../lib/models/Band');

describe('Band model', () => {

    it('Valid Model', () => {
        const data = {
            name: 'Preoccupations',
            location: {
                city: 'Calgary',
                country: 'Canada'
            },
            albums: ['Viet Cong', 'Preoccupations', 'New Material']
        };

        const band = new Band(data);

        assert.deepEqual(band.toJSON(), { _id: band._id, ...data });
    });
});