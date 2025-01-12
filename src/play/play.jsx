import React from 'react';
import './play.css';

export function Play() {
  const calmMessages = ['Tal calmed by cars', 'Jordan calmed by gunshots', 'John calmed by rain', '민수 calmed by waves', 'Sai calmed by thunder'].reduce((a, calm, i) => {
    a.push(<div key={i}>{calm}</div>);
    return a;
  }, []);

  return (
    <main className='container-fluid'>
      <form>
        <h3>Calming tones</h3>
        <div className='player-controls'>
          <fieldset>
            <div>
              <div className='input-group'>
                <div className='input-group-text'>
                  <input className='form-check-input' type='checkbox' value='rain' id='rain' />
                </div>
                <input type='text' className='form-control' disabled value='rain' id='rain-label' />
              </div>
              <div className='input-group'>
                <div className='input-group-text'>
                  <input className='form-check-input' type='checkbox' value='thunder' id='thunder' />
                </div>
                <input type='text' className='form-control' disabled value='thunder' id='thunder-label' />
              </div>
              <div className='input-group'>
                <div className='input-group-text'>
                  <input className='form-check-input' type='checkbox' value='waves' id='waves' />
                </div>
                <input type='text' className='form-control' disabled value='waves' id='waves-label' />
              </div>
            </div>
          </fieldset>
          <div className='input-group play-button-container'>
            <span className='input-group-text' id='username'>
              <img className='play-button' src='logo.svg' />
            </span>
            <button className='btn btn-primary' type='button' id='play'>
              Play
            </button>
          </div>
        </div>
        <h3>Calm friends</h3>
        <div className='messages form-control'>{calmMessages}</div>
        <div className='text-start lead'>
          <a className='text-body-secondary' href='https://forecast.weather.gov/MapClick.php?lat=40.231783&lon=-111.645982'>
            Weather forecast: Snow
          </a>
        </div>
      </form>
    </main>
  );
}
