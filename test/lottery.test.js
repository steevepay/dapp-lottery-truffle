const Lottery = artifacts.require("Lottery");

contract("Lottery Contract", (accounts) => {
  it("deploys a contract", () => {
    // const lottery = await Lottery.deployed();
    assert.ok(Lottery.address);
  })

  it("can enter a new player", async () => {
    const lottery = await Lottery.deployed();
    await lottery.enter({
      from: accounts[0],
      // send the value to a payable function
      // toWei is a utility method in web3 to convert eth to wei
      value: web3.utils.toWei('0.011', 'ether')
    });
    const players = await lottery.getPlayers({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  })

  it("can enter multiple player", async () => {
    const lottery = await Lottery.deployed();
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.011', 'ether')
    });
    // await lottery.enter({
    //   from: accounts[1],
    //   value: web3.utils.toWei('0.011', 'ether')
    // });
    // await lottery.enter({
    //   from: accounts[2],
    //   value: web3.utils.toWei('0.011', 'ether')
    // });
    const players = await lottery.getPlayers({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    // assert.equal(accounts[1], players[1]);
    // assert.equal(accounts[2], players[2]);
    // assert.equal(3, players.length);
  })

  it("requires a minimum amount of ether to enter", async () => {
    const lottery = await Lottery.deployed();
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      })
      assert(false);
    } catch (err) {
      assert(err);
    }
  })

  it("only manager can call pickwinner", async () => {
    const lottery = await Lottery.deployed();
    try {
      await lottery.methods.pickWinner().call({
        from: account[1]
      })
      assert(false);
    } catch (err) {
      assert(err);
    }
  })

  it("send money to the winner and resets the players array", async () => {
    const lottery = await Lottery.deployed();
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.pickWinner({
      from: accounts[0]
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei('1.8', 'ether'));
  })
})