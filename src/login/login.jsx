import React from 'react';
import './login.css';

export function Login({ setActiveUser }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function register() {
    setActiveUser(username);
  }

  function login(e) {
    e.preventDefault();
    setActiveUser(username);
  }

  return (
    <main className="container-fluid">
      <form>
        <fieldset>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="true"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input type="password" className="form-control" placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="login-buttons">
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
            <button type="button" className="btn btn-secondary" onClick={register}>
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
