# DAPP Lottery

## Setup


at the root directory, you have to create a '.env' file  with your Ethereum [INFURA API](https://infura.io/) url:
```js
REACT_APP_INFURA_URL="https://rinkeby.infura.io/v3/..."
// You can also use this link: https://rinkeby.infura.io/v3/aa7a461490244b65a54e2f67b959fa8a
```
Create a '.secret' file containing your ethereum wallet mnemonic (12 words, from metamask):
```
pistol cat dog etc...
```

Install the dependency:

```shell
$ npm install
```
You need Truffle installed:
```shell
$ npm install -g truffle@5.0.21
```
Then compile the contracts:
```shell
$ truffle compile
```
Then deploy you contract on the ethereum test network of your choice (configs on the 'truffle-config.js'):
```shell
$ truffle migrate --network=rinkeby
```
Finallyse your '.env' file by adding your deployed contract address:
```js
REACT_APP_FACTORY_CONTRACT_ADDRESS="0x8..."
// or you can use the following deployed contract: 0x8574BcbB0a0a2dF8172aBeF30e22CD033a8CCfDA
```
Runs the app:
```shell
$ npm run start
```

Congratulation, your decentralized Lottery is running. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 🎉

## Tests
Run the unit tests (You need [Ganache installed](https://www.trufflesuite.com/docs/ganache/quickstart) ):
```shell
$ truffle test ./test/Lottery.test.js
```

## Useful links
- [Truffle Documentation](https://www.trufflesuite.com/docs/truffle/quickstart)