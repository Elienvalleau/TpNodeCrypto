#!/usr/bin/env node
const program = require('commander');
const init = require('./inquirer');
const CryptoBdd = require('./model/crypto');
CryptoBdd.sync();

program
    .version('1.0.0')
    .option('-i, --init', 'initialisation')
    .option('-a, --add', 'add crypto in favoris')
    .option('-d, --delete', 'delete a crypto')
    .option('-dA, --deleteAll', 'delete all favoris');

program.parse(process.argv);

if(program.init){
    init();
} else if (program.add){

} else if (program.delete){

} else if (program.deleteAll) {

} else {
    program.help()
}
