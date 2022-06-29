import { useState } from 'react';
import './App.css';
import Tcalender from './t-calender/t-calender';

function App() {
  const [date, setDate] = useState('');
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='pt-5'>Labeba-Tahsin/react-calender</h1>
            <div className='align-items-center justify-content-center custom-container'>
              <Tcalender dateSelect={(d) => { setDate(d.toString()) }}></Tcalender>
              {date &&
                <div>
                  <h5 className='pt-4'>Selected Date:</h5>
                  <p>{date}</p>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
