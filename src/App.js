import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Door from './Components/Door.js';
import Results from './Components/Results.js';
import Instructions from './Components/Instructions';

const door1 = require('./img/door1.jpg');
const door2 = require('./img/door2.jpg');
const door3 = require('./img/door3.jpg');
const GOAT = require('./img/the-goat.png');

export const DoorsContext = createContext(null);
export const ResultsContext = createContext(null);

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

// USER WANTS TO STICK WITH THEIR ORIGINAL DOOR
  const stayDoor = () => {
    setSecondPick(firstPick);
  };

// USER WANTS TO SWITCH TO THE OTHER REMAINING DOOR
  const switchDoor = () => {
    const doors = [1,2,3];
    const remainingDoor = doors.filter(n => n !== firstPick && n !== revealDoor)[0]
    setSecondPick(remainingDoor)
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

// RESET SIMULATION
  const reset = () => {
    tally();
    setPrizeDoor(null);
    setFirstPick(null);
    setRevealDoor(null);
    setSecondPick(null);
  }

  const doorsContext = {
    prizeDoor,
    revealDoor,
    secondPick,
    firstDoorPick
  }

  const resultsContext = {
    switchWin,
    switchLose,
    stayWin,
    stayLose
  }

    return (
      <div className="container">
      <div className="App">
      <div className="Simulation column">
        {(intro)
          ? null
          : <div className="door-row box">
            <DoorsContext.Provider value={doorsContext}>
              <Door door={1} doorImg = {door1} />
              <Door door={2} doorImg = {door2} />
              <Door door={3} doorImg = {door3} />
            </DoorsContext.Provider>
            </div>}
        <div className="Text box">
          <Instructions firstPick={firstPick} intro={intro} beginSim={beginSim} secondPick={secondPick} revealDoor={revealDoor} prizeDoor={prizeDoor} stayDoor={stayDoor} switchDoor={switchDoor} reset={reset}/>
        </div>
      </div>
      <div className="results box">
        <img className="goatimg" src={GOAT}/>
        <ResultsContext.Provider value={resultsContext}>
          <Results/>
        </ResultsContext.Provider>
      </div>
      </div>
      </div>
    );
  };

export default App;
