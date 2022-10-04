import React from 'react';
import Welcome from './Welcome';
import '../App.css';

function Instructions(props) {
    return(
      <div>
          <div className="title">Monty Hall Simulator</div>
          {(props.firstPick === null)
            ? (props.intro)
              ?<Welcome begin={props.beginSim}/>
              :<div>Pick a door!<br/><br/></div>
            : (props.secondPick === null)
          ? (<div>You picked door {props.firstPick}. Monty tells me there's a goat behind door {props.revealDoor}. <br/>
            Do you want to STAY or SWAP?</div>)
          : (props.secondPick === props.prizeDoor)
            ? 'You won!'
            : 'You lost!'}
          <div>
          {(props.firstPick !== null && props.secondPick === null)
            ? (<div>
              <button className="buttons" onClick={props.stayDoor}>STAY</button>
              <button className="buttons" onClick={props.switchDoor}>SWAP</button>
            </div>
            )
            : ''}
          {(props.firstPick !== null && props.secondPick !== null)
            ?<button className="buttons" onClick={props.reset}>TRY AGAIN</button>
            : ''}
          </div>
          </div>
    )
}

export default Instructions;