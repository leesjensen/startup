import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className='container-fluid'>
      <form action='play.html' method='get'>
        <fieldset>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='username'>
              @
            </span>
            <input type='text' className='form-control' placeholder='Username' />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='password'>
              🔒
            </span>
            <input type='text' className='form-control' placeholder='password' />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <button className='btn btn-secondary'>Register</button>
        </fieldset>
      </form>
    </main>
  );
}
