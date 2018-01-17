const Sequelize = require('Sequelize'),
    sequelize = require('../utils/sequelize'),

    SensoryBlock = sequelize.define('sensory_block', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        sensory_block_name: Sequelize.STRING(20),
        sensory_block_value: Sequelize.INTEGER
    }, {
        timestamps: false
    });

module.exports = SensoryBlock;