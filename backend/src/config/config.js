const path = require('path');
require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            underscored: true,
            timestamps: true
        }
    },
    test: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            underscored: true,
            timestamps: true
        }
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            underscored: true,
            timestamps: true
        }
    }
};
