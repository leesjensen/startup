import React from 'react';
import Service from '../service';
import './login.css';

export function Login({ setActiveUser }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  function register() {
    const result = Service.register(username, password);
    if (result.success) {
      setActiveUser(username);
    } else {
      setErrorMsg(result.message);
    }
  }

  function login(e) {
    e.preventDefault();

    const result = Service.login(username, password);
    if (result.success) {
      setActiveUser(username);
    } else {
      setErrorMsg(result.message);
    }
  }

  return (
    <main className='container-fluid'>
      <div className='error-message'>{errorMsg}</div>
      <form>
        <fieldset>
          <div className='input-group mb-3'>
            <span className='input-group-text'>@</span>
            <input type='text' className='form-control' placeholder='username' id='username' onChange={(e) => setUsername(e.target.value)} autoComplete='true' />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>🔒</span>
            <input type='password' className='form-control' placeholder='password' id='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='login-buttons'>
            <button className='btn btn-primary' onClick={login} disabled={!username || !password}>
              Login
            </button>
            <button type='button' className='btn btn-secondary' onClick={register} disabled={!username || !password}>
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
