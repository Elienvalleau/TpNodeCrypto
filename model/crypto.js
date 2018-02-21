const Sequelize = require("sequelize");
const db = require("../db");

const CryptoBdd = db.define("cryptobdd", {
  idCrypto: Sequelize.STRING,
  name: Sequelize.STRING,
  createdAt: Sequelize.DATE
});

const isInit = db.define("isinit", {
  isInit: { type: Sequelize.BOOLEAN, default: false },
  createdAt: Sequelize.DATE
});
module.exports = { CryptoBdd, isInit };
