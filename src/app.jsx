import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body'>
      <header>
        <header>
          <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className='container-fluid'>
              <a className='navbar-brand'>
                <img src='logo.svg' width='30' height='30' className='d-inline-block align-top' alt='' />
                Calmer
              </a>
            </div>
          </nav>
        </header>
      </header>
      <main>App components go here</main>
      <footer>
        <nav className='navbar sticky-bottom bg-body-tertiary'>
          <div className='container-fluid'>
            <span>
              <img src='logo-github.svg' />{' '}
              <a className='navbar-text' href='https://github.com/leesjensen/startup'>
                GitHub
              </a>
            </span>{' '}
            <span className='navbar-text'>Lee S Jensen</span>
          </div>
        </nav>
      </footer>
      <script defer src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'></script>
    </div>
  );
}
