const Sequelize = require('Sequelize'),

    config = require('../../config'),
    databaseConfig = config.database,

    sequelize = new Sequelize(
        databaseConfig.database,
        databaseConfig.username,
        databaseConfig.password, {

            host: databaseConfig.host,
            port: databaseConfig.port,
            dialect: 'mysql',

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            define: {
                underscored: true
            }

            // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
            // operatorsAliases: false

        }
    );

module.exports = sequelize;