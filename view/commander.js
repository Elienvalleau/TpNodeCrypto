#!/usr/bin/env node
const program = require("commander");
const {
  addFavorites,
  showFavorites,
  deleteFavorites,
  exportFavorites,
  uploadFavorites
} = require("./inquirer");
const { isInit } = require("../model/crypto");
const db = require("../db.js");
const chalk = require("chalk");
const { Op } = require("sequelize");

db.sync();

// isInit.destroy({where:{isInit: true}});

program
  .version("1.0.0", "-v, --version")
  .option("-i, --init", "initialization of your favorites")
  .option("-s, --show", "show your favorites")
  .option("-a, --add", "add a crypto to your favorites")
  .option("-d, --delete", "delete a crypto from your favorites")
  .option("-e, --export", "export your favorites in a JSON file")
  .option("-u, --upload [json file path]", "import your favorite list");

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
            console.log(chalk.red(err));
          }
        })();
      }

      if (program.upload) {
        return (async () => {
          try {
            uploadFavorites(program.upload);
          } catch (err) {
            console.log(chalk.red(err));
          }
        })();
      }

      if (program.init) {
        console.log(chalk`{yellow \u26A0 Already made initialization}`);
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
