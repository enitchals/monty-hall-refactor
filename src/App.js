import React, { useState, useEffect } from 'react';
import './App.css';
import Door from './Components/Door.js';
import Results from './Components/Results.js';
import Welcome from './Components/Welcome.js';

const door1 = require('./img/door1.jpg');
const door2 = require('./img/door2.jpg');
const door3 = require('./img/door3.jpg');
const GOAT = require('./img/the-goat.png');

function App() {
  const [prizeDoor, setPrizeDoor] = useState(null);
  const [firstPick, setFirstPick] = useState(null);
  const [revealDoor, setRevealDoor] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [switchWin, setSwitchWin] = useState(0);
  const [switchLose, setSwitchLose] = useState(0);
  const [stayWin, setStayWin] = useState(0);
  const [stayLose, setStayLose] = useState(0);
  const [intro, setIntro] = useState(false); // don't forget to set this back to true


  useEffect(() => {
    if (prizeDoor === null) {assignPrize()}
  });


// BEGIN SIMULATION
  const beginSim = () => {
    setIntro(false);
  }

// ASSIGNS A PRIZE DOOR
  const assignPrize = () => {
    setPrizeDoor(Math.floor(Math.random() * 3 + 1));
  };

// RECORDS THE FIRST DOOR THE PLAYER PICKS
  const firstDoorPick = (door) => {
    setFirstPick(door);
    const doors = [1,2,3];
    const options = doors.filter(n => n !== door && n !== prizeDoor);
    setRevealDoor(options[Math.floor(Math.random()*options.length)])
  };

// CONFIRMS THE USER WANTS TO STICK WITH THEIR ORIGINAL DOOR
  const stayDoor = () => {
    setSecondPick(firstPick);
  };

// CONFIRMS THE USER WANTS TO SWITCH TO THE OTHER REMAINING DOOR
  const switchDoor = () => {
    if (firstPick !== 1 && revealDoor !== 1) {setSecondPick(1)};
    if (firstPick !== 2 && revealDoor !== 2) {setSecondPick(2)};
    if (firstPick !== 3 && revealDoor !== 3) {setSecondPick(3)};
  };

// TALLY THE RESULTS OF THIS ROUND
  const tally = () => {
    // IF THEY STAYED:
    if (firstPick === secondPick) {
      if (secondPick === prizeDoor) {
        setStayWin(stayWin+1)
        return;
      }
      setStayLose(stayLose+1)
      return;
    }
    // IF THEY SWITCHED:
    if (secondPick === prizeDoor) {
      setSwitchWin(switchWin+1)
      return;
    }
    setSwitchLose(switchLose+1)
  }

// RESET THE SIMULATION
  const reset = () => {
    tally();
    setPrizeDoor(null);
    setFirstPick(null);
    setRevealDoor(null);
    setSecondPick(null);
    // assignPrize();
  }

    return (
      <div className="container">
      <div className="App">
      <div className="Simulation column">
        {(intro)
          ? null
          : <div className="door-row box">
            <Door door="1" doorImg = {door1} firstDoorPick = {() => firstDoorPick(1)} revealDoor={revealDoor} secondPick={secondPick} prizeDoor={prizeDoor}/>
            <Door door="2" doorImg = {door2} firstDoorPick = {() => firstDoorPick(2)} revealDoor={revealDoor} secondPick={secondPick} prizeDoor={prizeDoor}/>
            <Door door="3" doorImg = {door3} firstDoorPick = {() => firstDoorPick(3)} revealDoor={revealDoor} secondPick={secondPick} prizeDoor={prizeDoor}/>
            </div>}
        <div className="Text box">
          <div className="title">Monty Hall Simulator</div>
          {(firstPick === null)
            ? (intro)
              ?<Welcome begin={beginSim}/>
              :<div>Pick a door!<br/><br/></div>
            : (secondPick === null)
          ? (<div>You picked door {firstPick}. Monty tells me there's a goat behind door {revealDoor}. <br/>
            Do you want to STAY or SWAP?</div>)
          : (secondPick === prizeDoor)
            ? 'You won!'
            : 'You lost!'}
          <div>
          {(firstPick !== null && secondPick === null)
            ?<button className="buttons" onClick={stayDoor}>STAY</button>
            : ''}
          {(firstPick !== null && secondPick === null)
            ?<button className="buttons" onClick={switchDoor}>SWAP</button>
            : ''}
          {(firstPick !== null && secondPick !== null)
            ?<button className="buttons" onClick={reset}>TRY AGAIN</button>
            : ''}
          </div>
        </div>
      </div>
      <div className="results box">
        <img className="goatimg" src={GOAT}/>
        <Results stayWin={stayWin} switchWin={switchWin} stayLose={stayLose} switchLose={switchLose}/>
      </div>
      </div>
      </div>
    );
  };

export default App;
