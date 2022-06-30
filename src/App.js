import { useState } from 'react';
import './App.css';
import Tcalender from './t-calender/t-calender';

function App() {
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState(false);
  const [animate, setAnimate] = useState(false);
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='pt-5'>Labeba-Tahsin/react-calender</h1>
            <div>
              <input type="checkbox" className='d-inline-block'
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              /><span className='px-2 d-inline-block'>Dark Mode</span></div>
            <div>
              <input type="checkbox" className='d-inline-block'
                defaultChecked={animate}
                onChange={() => setAnimate(!animate)}
              /><span className='px-2 d-inline-block'>Animate</span></div>
            <div className='align-items-center justify-content-center custom-container'>
              <Tcalender animate={animate} darkMood={checked} dateSelect={(d) => { setDate(d.toString()) }}></Tcalender>
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
