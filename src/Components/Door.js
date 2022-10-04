import React, {useContext} from 'react';
import { DoorsContext } from '../App'

const goat = require('../img/goat.jpg');
const prize = require('../img/prize.jpg');

function Door(props) {
    const value = useContext(DoorsContext);
    console.log(value)
        return(
            <div className="door">
                {(value.revealDoor == props.door)
                    ? <img className="doorWidth" src={goat}/>
                    : (value.secondPick === null)
                        ? <img
                            className="doorWidth" src={props.doorImg}
                            onClick={() => value.firstDoorPick(props.door)}
                            />
                        : (value.prizeDoor == props.door)
                            ? <img className="doorWidth" src={prize}/>
                            : <img className="doorWidth" src={goat}/>
                            }
            </div>
        )
}

export default Door;