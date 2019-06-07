import Web3 from "web3";

// if (typeof window.web3 !== 'undefined') {
const getProvider = async () => {
  await window.web3.currentProvider.enable(); // request authentication
};
getProvider();

const web3 = new Web3(window.web3.currentProvider);

export default web3;