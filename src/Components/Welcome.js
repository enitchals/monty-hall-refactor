import React, {Component} from 'react';

export default function Welcome(props){
    return(
        <div className="welcome">
            <p>The Monty Hall Problem is a paradox framed as a game show. The host (Monty) shows you three doors. He tells you that two of the doors conceal goats and the third conceals a fabulous prize. He asks you to pick a door.</p>
            <p>After you tell him your choice, he opens one of the doors you <i>didn't</i> choose and reveals a goat. He asks if you'd like to stay with your original choice or swap and pick the other door that's still closed. Which should you choose?</p>
            <p>If your gut instict tells you it doesn't really matter -- that you have the same probability of winning either way -- then you're not alone, but you <i>are</i> mistaken. The strategy of switching to the other door will win 2/3 of the time.</p>
            <p>Dubious? Give the Monty Hall Simulator a try and see for yourself...</p>
            <button onClick={props.begin}>Begin</button>
        </div>
    )
}