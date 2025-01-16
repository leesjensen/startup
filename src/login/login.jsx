import React from 'react';
import Service from '../service';
import './login.css';

export function Login({ setActiveUser }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  async function register() {
    try {
      const user = await Service.register(email, password);
      setActiveUser(user);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  async function login(e) {
    e.preventDefault();

    try {
      const user = await Service.login(email, password);
      setActiveUser(user);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <main className='container-fluid'>
      <div className='error-message'>{errorMsg}</div>
      <form>
        <fieldset>
          <div className='input-group mb-3'>
            <span className='input-group-text'>@</span>
            <input
              type='text'
              className='form-control'
              placeholder='email@yourplace.com'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='true'
            />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>🔒</span>
            <input type='password' className='form-control' placeholder='password' id='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='login-buttons'>
            <button className='btn btn-primary' onClick={login} disabled={!email || !password}>
              Login
            </button>
            <button type='button' className='btn btn-secondary' onClick={register} disabled={!email || !password}>
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
