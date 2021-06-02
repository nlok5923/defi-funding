// take compiled code and deploy it 
const HDWallletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

//setup hdwalle provider

const MNEMONIC = 'video aisle spend cycle razor wagon sugar monitor caught raven lyrics camera'
const provider = new HDWallletProvider( 
    //first agru is mnemonic
    MNEMONIC,
    //second agr is url to what network we need to connect we need to deploy at rinkeby test network
    'https://rinkeby.infura.io/v3/1c9b913a1e5847d1b8753adf181c8a99'
);

const web3 = new Web3(provider);
const deploy = async () => {
    //get list of all acccount that has been unlocked
    //mnemonic specify many account but we will take only first account
    const accounts = await web3.eth.getAccounts();
    console.log("attempt to deploy from account", accounts[0]);

    //deploying
    //interfae is the ABI
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode })
    .send({ gas:'1000000', from: accounts[0]});

    //display the address our contract deployed to 
    console.log('contract dpleoyed to' ,result.options.address);

    // attempt to deploy from account 0xE7186aE499D32D848fd0544ED199dd731e832523
    // contract dpleoyed to 0xC8f97b0CFe7ac0a86F6BD9f4a9B6f7aBBb0aF2d0
    //kickstarter deployed at  0xaEf20A2AC427346aba4F6cBc8D09ad29713608f0
};

//just to sue async await syntax
deploy();
