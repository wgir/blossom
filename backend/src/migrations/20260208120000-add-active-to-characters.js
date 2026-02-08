'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('characters', 'active', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('characters', 'active');
    }
};
