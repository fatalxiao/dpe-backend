const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    Group = sequelizeInstance.define('dpe_group', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        groupName: {
            type: Sequelize.STRING(20),
            field: 'group_name'
        }
    }, {
        timestamps: false
    });

module.exports = Group;