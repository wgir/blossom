'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('characters', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(50)
            },
            species: {
                type: Sequelize.STRING(100)
            },
            type: {
                type: Sequelize.STRING(100)
            },
            gender: {
                type: Sequelize.STRING(50)
            },
            image: {
                type: Sequelize.TEXT
            },
            origin_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'locations',
                    key: 'id'
                }
            },
            location_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'locations',
                    key: 'id'
                }
            },
            created: {
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('characters');
    }
};
