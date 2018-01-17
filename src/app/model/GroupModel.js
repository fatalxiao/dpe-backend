const Sequelize = require('Sequelize'),
    sequelize = require('../utils/sequelize'),

    Group = sequelize.define('dep_group', {
        id: {
            type: Sequelize.INTEGER(2),
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        group_name: Sequelize.STRING(20)
    }, {
        timestamps: false
    });

module.exports = Group;