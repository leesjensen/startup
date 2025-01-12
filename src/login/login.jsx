import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className='container-fluid'>
      <form>
        <fieldset>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='username'>
              @
            </span>
            <input type='text' className='form-control' placeholder='Username' id='username' autoComplete='true' />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='password'>
              🔒
            </span>
            <input type='text' className='form-control' placeholder='password' id='password' />
          </div>
          <div className='login-buttons'>
            <button className='btn btn-primary'>Submit</button>
            <button className='btn btn-secondary'>Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
