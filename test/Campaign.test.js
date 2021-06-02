//single test for both contracts
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//everything which is in campaignFactory
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

//list of all diff acount in local ganache network
let accounts;
let factory;
let campaignAddress;
let campaign;

//test skipped currentlys

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas:'1000000' });
    //try to deploy new instance
    //called createCampaign function 
    // it require amount of monye which is min contribution
    //100 wei as min contribution 
    // we will be sending no as string
    // modifying fddata on blocchain so paisa dena hoga
    // we only receive a transation receipt  
    await factory.methods.createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' });

    //it's view so not chnaging any data so no fee
    // it will return an array of address 
    const addresses = await factory.methods.getDeployedCampaigns().call();
    //as we deployed only one contract
    campaignAddress = addresses[0];
    // now we need to create an instance of campaign
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        //address of where this campign exist
        campaignAddress
    );
});

