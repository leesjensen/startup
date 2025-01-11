import React from 'react';
import './play.css';

export function Play() {
  const calmMessages = ['John calmed by rain', '민수 calmed by waves', 'Sai calmed by thunder'].reduce((a, calm, i) => {
    a.push(<p key={i}>{calm}</p>);
    return a;
  }, []);

  return (
    <main className='container-fluid'>
      <form>
        <legend>Calming tones</legend>
        <div className='player-controls'>
          <fieldset>
            <div>
              <div className='input-group'>
                <div className='input-group-text'>
                  <input className='form-check-input mt-0' type='checkbox' value='rain' />
                </div>
                <input type='text' className='form-control' disabled value='rain' />
              </div>
              <div className='input-group'>
                <div className='input-group-text'>
                  <input className='form-check-input mt-0' type='checkbox' value='thunder' />
                </div>
                <input type='text' className='form-control' disabled value='thunder' />
              </div>
              <div className='input-group'>
                <div className='input-group-text'>
                  <input className='form-check-input mt-0' type='checkbox' value='waves' />
                </div>
                <input type='text' className='form-control' disabled value='waves' />
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
        <fieldset>
          <legend>Calm friends</legend>
          <div className='input-group'>
            <div className='form-control' disabled style={{ height: '100px' }}>
              {calmMessages}
            </div>
          </div>
        </fieldset>
        <p className='text-center lead'>
          <a className='text-body-secondary' href='https://forecast.weather.gov/MapClick.php?lat=40.231783&lon=-111.645982'>
            Weather forecast: Snow
          </a>
        </p>
      </form>
    </main>
  );
}
