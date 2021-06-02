//creating web3 instance 
import Web3 from 'web3'
// we thing metamask alreay injected web3 instance to the page means people who are using metamask can only use this 
//window avail on browser but not in nodejs
//as we are running this is nodejs which is server side rendering
// const web3 = new Web3(window.web3.currentProvider);
let web3;

//code executed inside browser and metamask avaialaible
if(typeof window !== 'undefined' && typeof window.web3 != 'undefined') {
    //we are in the browser
    web3 = new Web3(window.web3.currentProvider); 
}else  {
    //we are on server or we are no running metamask
    const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/1c9b913a1e5847d1b8753adf181c8a99'
    );
    // no acount info is set to infura
    web3 = new Web3(provider);
}

export default web3;
//we will handle later user without metamask case 
