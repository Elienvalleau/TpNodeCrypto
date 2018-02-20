#!/usr/bin/env node
const Sequelize = require('sequelize');
const program = require('commander');
const init = require('./inquirer');
const { CryptoBdd } = require('./model/crypto');
const { isInit } = require('./model/crypto');
const db = require('./db.js');
// CryptoBdd.sync();
// isInit.sync();
db.sync();

program
    .version('1.0.0')
    .option('-i, --init', 'initialisation')
    .option('-s, --show', 'show crypto in dbb')
    .option('-a, --add', 'add crypto in favoris')
    .option('-d, --delete', 'delete a crypto')
    .option('-dA, --deleteAll', 'delete all favoris');

program.parse(process.argv);

if(program.init)
{
    //A DELETE APRES LES TESTS
    isInit.destroy({where:{isInit:"True"}});  //A DELETE APRES LES TESTS
    //A DELETE APRES LES TESTS

    isInit.findAll({where: { isInit: "True"}}).then(projects => {

        if (projects.length === 0){
            console.log("on va dans init");
            isInit.create({isInit:"True", createdAt: new Date()}).then(isinit => {
            });
            init();
        }
        else
        {
            console.log(projects);
            console.log("Vous avez déjà initialisé, utilisez -s pour voir vos favoris ")
        }
    })

} else if (program.show)
{

} else if (program.add)
{

} else if (program.delete)
{

} else if (program.deleteAll)
{

} else
    {
    program.help()
}
