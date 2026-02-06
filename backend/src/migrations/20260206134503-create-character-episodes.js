'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('character_episodes', {
            character_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'characters',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            episode_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'episodes',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('character_episodes');
    }
};
