import React from 'react';
import '../App.css';

function Results(props) {
        return(
          <div className="results-table">
          <h3>RESULTS:</h3>
          <table>
              <tr>
                <th>&nbsp;</th>
                <th>stay</th>
                <th>swap</th>
              </tr>
                <th>win</th>
                <td>{props.stayWin}</td>
                <td>{props.switchWin}</td>
              <tr>
                <th>lose</th>
                <td>{props.stayLose}</td>
                <td>{props.switchLose}</td>
              </tr>
          </table>
        </div>
        )
}

export default Results;