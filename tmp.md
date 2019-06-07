truffle-hdwallet-provider version 0.0.3

const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });


truffle-hdwallet-provider versions 0.0.4, 0.0.5 and 0.0.6

const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x' + bytecode }) // add 0x bytecode
     .send({from: accounts[0]}); // remove 'gas'