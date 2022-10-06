const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'data/database.db'
    },
    useNullAsDefault: true
})

exports.db = knex;