import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className='navbar navbar-expand  bg-body-tertiary'>
          <div className='container-fluid'>
            <a className='navbar-brand'>
              <img src='logo.svg' className='logo d-inline-block align-top' alt='' />
              almer
            </a>
            <div className='navbar-nav'>
              <NavLink className='nav-link' to='play'>
                Play
              </NavLink>
              <NavLink className='nav-link' to='about'>
                About
              </NavLink>{' '}
              <NavLink className='nav-link' to=''>
                Logout
              </NavLink>{' '}
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/play' element={<Play />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
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
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
