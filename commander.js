#!/usr/bin/env node
const Sequelize = require('sequelize');
const program = require('commander');
const { init, show, del } = require('./inquirer');
const { CryptoBdd } = require('./model/crypto');
const { isInit } = require('./model/crypto');
const db = require('./db.js');
db.sync();


// isInit.destroy({where:{isInit:"True"}});


program
    .version('1.0.0')
    .option('-i, --init', 'initialisation')
    .option('-s, --show', 'show crypto in dbb')
    .option('-a, --add', 'add crypto in favoris')
    .option('-d, --delete', 'delete a crypto')

program.parse(process.argv);

if(program.init)
{
    isInit.findAll({where: { isInit: "True"}}).then(projects => {
        if (projects.length === 0){
            isInit.create({isInit:"True", createdAt: new Date()}).then(isinit => {
            });
            init();
        }
        else
        {
            console.log("Vous avez déjà initialisé, utilisez -s pour voir vos favoris ");
        }
    })

} else if (program.show)
{
    isInit.findAll({where: { isInit: "True"}}).then(projects => {
        if (projects.length === 0){
            console.log("Vous devez d'abord faire -i");
        }
        else
        {
            show();
        }
    })

} else if (program.add)
{
    isInit.findAll({where: { isInit: "True"}}).then(projects => {
        if (projects.length === 0){
            console.log("Vous devez d'abord faire -i");
        }
        else
        {
            init();
        }
    })

} else if (program.delete)
{
    isInit.findAll({where: { isInit: "True"}}).then(projects => {
        if (projects.length === 0){
            console.log("Vous devez d'abord faire -i");
        }
        else
        {
            del();
        }
    })

}  else
    {
    program.help()
}
