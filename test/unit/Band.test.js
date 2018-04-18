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

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'Expected Validation Errors: GOT NONE');
        return validation.errors;
    };

    it('Required Fields', () => {
        const band = new Band({});
        const errors = getValidationErrors(band.validateSync());
        assert.equal(Object.keys(errors).length, 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors['location.city'].kind, 'required');
    });
});