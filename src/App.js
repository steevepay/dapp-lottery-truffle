import React, {Component} from 'react';

import './App.css';
import web3 from "./web3"
import lottery from "./lottery"

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message:'Welcome !'
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    this.setState({manager});
    this.getBalance();
    this.getPlayers();
  }

  onSubmit = async (event) => {
    event.preventDefault();
    
    const accounts = await web3.eth.getAccounts();
    if (this.state.value !== '') {
      this.setState({message: 'Waiting on transaction completed...'});
      try {
        await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether'),
          gas: 1000000
        })
      } catch (err) {
         console.log(err);
      }
      this.setState({message: 'You have been entered on the game!'});
      this.getBalance();
      this.getPlayers();
    } else {
      console.log('value empty');
    }
  }

  getBalance = async () => {
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({balance})
  }

  getPlayers = async () => {
    const players = await lottery.methods.getPlayers().call();
    this.setState({players}) 
  }
  pickWinner = async () => {
    this.setState({message: 'Waiting on transaction completed...'});
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.getBalance();
    this.getPlayers();
    this.setState({message: 'The winner has been picked!'});
  }
  render() {
    return ( 
      <div className = "App" >
        State: {this.state.message}
        <hr/>
        The manager is: {this.state.manager}.
        There are currently {this.state.players.length} people competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck ?</h4>
          <div>
            <label>Amount of ether to enter </label>
            <input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button> enter </button>
        </form>
        <hr/>
        <button onClick={this.pickWinner}>Pick a winner</button>
      </div>
    );
  }
}

export default App;