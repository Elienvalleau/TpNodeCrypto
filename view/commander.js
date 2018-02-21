#!/usr/bin/env node
const program = require("commander");
const { addFavorites, showFavorites, deleteFavorites, exportFavorites, uploadFavorites } = require("./inquirer");
const { isInit } = require("../model/crypto");
const db = require("../db.js");
const chalk = require("chalk");
const { Op } = require("sequelize");

db.sync();

// isInit.destroy({where:{isInit:"True"}});

program
  .version("1.0.0")
  .option("-i, --init", "initialization")
  .option("-s, --show", "show crypto in dbb")
  .option("-a, --add", "add crypto in favorite list")
  .option("-d, --delete", "delete a crypto")
  .option("-e, --export", "export favorite list")
  .option("-u, --upload [json file]", "upload your favorite list");

program.parse(process.argv);

(async () => {
  try {
    const request = await isInit.findAll({
      where: { isInit: { [Op.eq]: true } }
    });

    if (request.length !== 0) {
      if (program.show || !process.argv.slice(2).length) {
        return (async () => {
          try {
            showFavorites();
          } catch (err) {
            console.log(chalk.red(err));
          }
        })();
      }

      if (program.add) {
        return (async () => {
          try {
            addFavorites();
          } catch (err) {
            console.log(chalk.red(err));
          }
        })();
      }

      if (program.delete) {
        return (async () => {
          try {
            deleteFavorites();
          } catch (err) {
            console.log(chalk.red(err));
          }
        })();
      }

      if (program.export) {
        return (async () => {
          try {
            exportFavorites();
          } catch (err) {
            console.log(err);
          }
        })();
      }

      if (program.upload) {
        return (async () => {
          try {
            uploadFavorites(program.upload);
          } catch (err) {
            console.log(err);
          }
        })();
      }

      if (program.init) {
        //TODO Ajouter des couleurs
        console.log("Initialisation déjà effectuée");
      }
    } else {
      if (program.init || !process.argv.slice(2).length) {
        return (async () => {
          try {
            isInit.create({ isInit: true, createdAt: new Date() });
            addFavorites();
          } catch (err) {
            console.log(chalk.red(err));
          }
        })();
      }
    }
    program.help();
  } catch (err) {
    console.log(chalk.red(err));
  }
})();
