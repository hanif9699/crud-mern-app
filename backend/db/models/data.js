const { Model } = require('objection');

class Data extends Model {
    static get tableName() {
        return 'test_table';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'image'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                image: { type: 'string' }
            }
        };
    }
}
module.exports = Data;