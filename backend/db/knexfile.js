module.exports = {
    development: {
        client: 'mysql',
        connection: {
            database: 'app_db',
            user: 'root',
            password: '',
            host: 'localhost'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            database: 'app_db',
            user: 'root',
            password: '',
            host: 'localhost'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

}