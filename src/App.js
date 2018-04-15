import React, { Component } from 'react';
import './App.css';

const door1 = require('./img/door1.jpg');
const door2 = require('./img/door2.jpg');
const door3 = require('./img/door3.jpg');
const goat = require('./img/goat.jpg');
const GOAT = require('./img/the-goat.jpg');
const prize = require('./img/prize.jpg');

class App extends Component {
  constructor() {
    super();
    this.state = {
      prizeDoor: null,
      firstPick: null,
      revealDoor: null,
      secondPick: null,
      switchWin: 0,
      switchLose: 0,
      stayWin: 0,
      stayLose: 0,
    }
    this.assignPrize = this.assignPrize.bind(this);
    this.pickDoor1 = this.pickDoor1.bind(this);
    this.pickDoor2 = this.pickDoor2.bind(this);
    this.pickDoor3 = this.pickDoor3.bind(this);
    this.stayDoor = this.stayDoor.bind(this);
    this.switchDoor = this.switchDoor.bind(this);
    this.tally = this.tally.bind(this);
  }

  componentDidMount() {
    this.assignPrize();
  }

// ASSIGNS A PRIZE DOOR
  assignPrize = () => {
    const random = Math.ceil(Math.random() * 3);
    this.setState({prizeDoor: random});
  };

// RECORDS THE FIRST DOOR THE PLAYER PICKS
  pickDoor1 = () => {
    this.setState({firstPick: 1});
    if (this.state.prizeDoor === 1) {
      const doors = [2, 3];
      this.setState({revealDoor: doors[Math.floor(Math.random() *2)]});
    }
    if (this.state.prizeDoor === 2) {
      this.setState({revealDoor: 3});
    }
    if (this.state.prizeDoor === 3) {
      this.setState({revealDoor: 2});
    }
  };

  pickDoor2 = () => {
    this.setState({firstPick: 2});
    if (this.state.prizeDoor === 1) {
      this.setState({revealDoor: 3})
    }
    if (this.state.prizeDoor === 2) {
      const doors = [1, 3];
      this.setState({revealDoor: doors[Math.floor(Math.random() *2)]});
    }
    if (this.state.prizeDoor === 3) {
      this.setState({revealDoor: 1});
    }
  };

  pickDoor3 = () => {
    this.setState({firstPick: 3});
    if (this.state.prizeDoor === 1) {
      this.setState({revealDoor: 2})
    }
    if (this.state.prizeDoor === 2) {
      this.setState({revealDoor: 1});
    }
    if (this.state.prizeDoor === 3) {
      const doors = [1, 2];
      this.setState({revealDoor: doors[Math.floor(Math.random() *2)]});
    }
  };

// CONFIRMS THE USER WANTS TO STICK WITH THEIR ORIGINAL DOOR
  stayDoor = () => {
    this.setState({secondPick: this.state.firstPick});
  };

// CONFIRMS THE USER WANTS TO SWITCH TO THE OTHER REMAINING DOOR
  switchDoor = () => {
    const pick = this.state.firstPick;
    const reveal = this.state.revealDoor;
    if (pick !== 1 && reveal !== 1) {this.setState({secondPick: 1})};
    if (pick !== 2 && reveal !== 2) {this.setState({secondPick: 2})};
    if (pick !== 3 && reveal !== 3) {this.setState({secondPick: 3})};
  };

// TALLY THE RESULTS OF THIS ROUND
  tally = () => {
    const first = this.state.firstPick;
    const second = this.state.secondPick;
    const prize = this.state.prizeDoor;
    // IF THEY STAYED:
    if (first === second) {
      if (second === prize) {
        this.setState({stayWin: this.state.stayWin+1});
        return;
      }
      this.setState({stayLose: this.state.stayLose+1})
      return;
    }
    // IF THEY SWITCHED:
    if (second === prize) {
      this.setState({switchWin: this.state.switchWin+1});
      return;
    }
    this.setState({switchLose: this.state.switchLose+1});
  }

// RESET THE SIMULATION
  reset = () => {
    this.tally();    
    this.setState({
      prizeDoor: null,
      firstPick: null,
      revealDoor: null,
      secondPick: null
    });
    this.assignPrize();
  }

  render() {
    return (
      <div className="container">
      <div className="App">
      <div className="Simulation column">
      <div className="door-row box">
        <div className="Door1 door">
          <div>{(this.state.revealDoor === 1)
            ? <img className="doorWidth" src={goat}/>
            : (this.state.secondPick === null)
              ? <img className="doorWidth" src={door1} onClick={this.pickDoor1}/>
              : (this.state.prizeDoor === 1)
                ? <img className="doorWidth" src={prize}/>
                : <img className="doorWidth" src={goat}/>
              }</div>
          </div>

        <div className="Door2 door">
          <div>{this.state.revealDoor === 2
            ? <img className="doorWidth" src={goat}/>
            : (this.state.secondPick === null)
              ? <img className="doorWidth" src={door2} onClick={this.pickDoor2}/>
              : (this.state.prizeDoor === 2)
                ? <img className="doorWidth" src={prize}/>
                : <img className="doorWidth" src={goat}/>
              }</div>
          </div>

        <div className="Door3 door">
          <div>{this.state.revealDoor === 3
            ? <img className="doorWidth" src={goat}/>
            : (this.state.secondPick === null)
              ? <img className="doorWidth" src={door3} onClick={this.pickDoor3}/>
              : (this.state.prizeDoor === 3)
                ? <img className="doorWidth" src={prize}/>
                : <img className="doorWidth" src={goat} />
              }</div>
          </div>
        </div>
        <div className="Text box">
          <div className="title">Monty Hall Simulator</div>
          {(this.state.firstPick === null)
            ? <div>Pick a door!<br/><br/></div>
            : (this.state.secondPick === null)
          ? (<div>You picked door {this.state.firstPick}. Monty tells me there's a goat behind door {this.state.revealDoor}. <br/>
            Do you want to STAY or SWAP?</div>)
          : (this.state.secondPick === this.state.prizeDoor)
            ? 'You won!'
            : 'You lost!'}
          <div>
          {(this.state.firstPick !== null && this.state.secondPick === null)
            ?<button className="buttons" onClick={this.stayDoor}>STAY</button>
            : ''}
          {(this.state.firstPick !== null && this.state.secondPick === null)
            ?<button className="buttons" onClick={this.switchDoor}>SWAP</button>
            : ''}
          {(this.state.firstPick !== null && this.state.secondPick !== null)
            ?<button className="buttons" onClick={this.reset}>TRY AGAIN</button>
            : ''}
          </div>
        </div>

      </div>
      <div className="results box">
        <img className="goatimg" src={GOAT}/>
        <div className="results-table">
        <h3>RESULTS:</h3>
        <tr>
          <th>&nbsp;</th>
          <th>stay</th>
          <th>swap</th>
        </tr>
          <th>win</th>
          <td>{this.state.stayWin}</td>
          <td>{this.state.switchWin}</td>
        <tr>
          <th>lose</th>
          <td>{this.state.stayLose}</td>
          <td>{this.state.switchLose}</td>
        </tr>
        </div>
      </div>
      </div>
      </div>
    );
  };
};

export default App;
