import React from 'react';

const door1 = require('../img/door1.jpg');
const door2 = require('../img/door2.jpg');
const door3 = require('../img/door3.jpg');
const goat = require('../img/goat.jpg');
const prize = require('../img/prize.jpg');

function Door(props) {
        return(
            <div className="door">
                {(props.revealDoor == props.door)
                    ? <img className="doorWidth" src={goat}/>
                    : (props.secondPick === null)
                        ? <img
                            className="doorWidth" src={props.doorImg}
                            onClick={() => props.firstDoorPick(props.door)}
                            />
                        : (props.prizeDoor == props.door)
                            ? <img className="doorWidth" src={prize}/>
                            : <img className="doorWidth" src={goat}/>
                            }
            </div>
        )
}

export default Door;