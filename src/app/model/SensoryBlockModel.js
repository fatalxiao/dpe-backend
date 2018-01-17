const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    SensoryBlock = sequelizeInstance.define('sensory_block', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        sensoryBlockName: {
            field: 'sensory_block_name',
            type: Sequelize.STRING(20)
        },
        sensoryBlockValue: {
            field: 'sensory_block_value',
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

module.exports = SensoryBlock;