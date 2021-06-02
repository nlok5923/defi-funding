// we will compile one time and save the op to file so that we don't need to compile again and again
const path = require('path');
const solc = require('solc');
//similar to fs module but improved verion of fs module 
const fs = require('fs-extra');
// const fs = require('fs');
//delete entire build if it already exist
const buildPath = path.resolve(__dirname, 'build');
// //to remove entire directory
// // simple fs do not has this facility
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
// console.log(source);

const output = solc.compile(source, 1).contracts;
// const output = solc.compile(source, 1);
// console.log(output);

// output has two output one from factory and other from campaign
//recreaste build folder

//check if dir exist if not exist create it 
fs.ensureDirSync(buildPath);
// file with colon names is invalid in windows so it is not working anf giving enonent
for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}