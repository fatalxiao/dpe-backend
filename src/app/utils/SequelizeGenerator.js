import Sequelize from 'sequelize';
import config from '../../config.js';

const databaseConfig = config.database;
let sequelize;

function generateSequelize() {

    if (sequelize) {
        return sequelize;
    }

    return sequelize = new Sequelize(
        databaseConfig.database,
        databaseConfig.username,
        databaseConfig.password, {

            host: databaseConfig.host,
            port: databaseConfig.port,
            dialect: 'mysql',
            freezeTableName: true,
            operatorsAliases: false,

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            define: {
                underscored: true,
                operatorsAliases: false
            },

            timezone: '+08:00'

        }
    );

}


export default generateSequelize;