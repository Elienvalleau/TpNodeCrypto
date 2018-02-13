const Sequelize = require('sequelize');
const db = require('../db');

const CryptoBdd = db.define('cryptobdd', {
    name: Sequelize.STRING,
    createdAt: Sequelize.DATE,
});
module.exports = CryptoBdd;