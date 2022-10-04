import React, {useContext} from 'react';
import Welcome from './Welcome';
import { Context } from '../App'
import '../App.css';

function Instructions(props) {
  const value = useContext(Context);
    return(
      <div>
          <div className="title">Monty Hall Simulator</div>
          {(value.firstPick === null)
            ? (value.intro)
              ?<Welcome begin={value.beginSim}/>
              :<div>Pick a door!<br/><br/></div>
            : (value.secondPick === null)
          ? (<div>You picked door {value.firstPick}. Monty tells me there's a goat behind door {value.revealDoor}. <br/>
            Do you want to STAY or SWAP?</div>)
          : (value.secondPick === value.prizeDoor)
            ? 'You won!'
            : 'You lost!'}
          <div>
          {(value.firstPick !== null && value.secondPick === null)
            ? (<div>
              <button className="buttons" onClick={value.stayDoor}>STAY</button>
              <button className="buttons" onClick={value.switchDoor}>SWAP</button>
            </div>
            )
            : ''}
          {(value.firstPick !== null && value.secondPick !== null)
            ?<button className="buttons" onClick={value.reset}>TRY AGAIN</button>
            : ''}
          </div>
          </div>
    )
}

export default Instructions;