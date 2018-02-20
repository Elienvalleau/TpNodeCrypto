#!/usr/bin/env node
const program = require("commander");
const { addFavorites, showFavorites, deleteFavorites } = require("./inquirer");
const { isInit } = require("../model/crypto");
const db = require("../db.js");

db.sync();

// isInit.destroy({where:{isInit:"True"}});

program
  .version("1.0.0")
  .option("-i, --init", "initialisation")
  .option("-s, --show", "show crypto in dbb")
  .option("-a, --add", "add crypto in favoris")
  .option("-d, --delete", "delete a crypto");

program.parse(process.argv);

(async () => {
  try {
    const projects = await isInit.findAll({ where: { isInit: "True" } });

    if (projects.length !== 0) {
      if (program.show || !process.argv.slice(2).length) {
        return (async () => {
          try {
            showFavorites();
          } catch (err) {
            console.log(err);
          }
        })();
      }

      if (program.add) {
        return (async () => {
          try {
            addFavorites();
          } catch (err) {
            console.log(err);
          }
        })();
      }

      if (program.delete) {
        return (async () => {
          try {
            deleteFavorites();
          } catch (err) {
            console.log(err);
          }
        })();
      }

      program.help();
    } else {
      if (program.init || !process.argv.slice(2).length) {
        return (async () => {
          try {
            isInit.create({ isInit: "True", createdAt: new Date() });
            addFavorites();
          } catch (err) {
            console.log(err);
          }
        })();
      }
    }
    program.help();
  } catch (err) {
    console.log(err);
  }
})();
