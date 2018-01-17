const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    SensoryBlock = sequelizeInstance.define('sensory_block', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        sensoryBlockName: {
            type: Sequelize.STRING(20),
            field: 'sensory_block_name'
        },
        sensoryBlockValue: {
            type: Sequelize.INTEGER,
            field: 'sensory_block_value'
        }
    }, {
        timestamps: false
    });

module.exports = SensoryBlock;