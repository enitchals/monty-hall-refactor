import React, {useContext} from 'react';
import { Context } from '../App'
import '../App.css';

function Results() {
  const value = useContext(Context);
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
            <td>{value.stayWin}</td>
            <td>{value.switchWin}</td>
          <tr>
            <th>lose</th>
            <td>{value.stayLose}</td>
            <td>{value.switchLose}</td>
          </tr>
      </table>
    </div>
    )
}

export default Results;