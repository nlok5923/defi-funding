import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    //first argument is contract abi 
    JSON.parse(CampaignFactory.interface),
    //address where we deployed factory
    '0x8fc6457b6Fe59Da3458d5E127A05bA1AB0eeE521'
);

//will get an empty array if we try to fetch all the campaigns
export default instance;
