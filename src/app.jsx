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
      <div className='body'>
        <header>
          <nav class='navbar navbar-expand-lg bg-body-tertiary'>
            <div class='container-fluid'>
              <a class='navbar-brand'>
                <img src='logo.svg' width='30' height='30' class='d-inline-block align-top' alt='' />
                Calmer
              </a>
              <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
                <span class='navbar-toggler-icon'></span>
              </button>
              <div class='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li class='nav-item'>
                    <NavLink className='nav-link' to='play'>
                      Play
                    </NavLink>
                  </li>
                  <li class='nav-item'>
                    <NavLink className='nav-link' to='about'>
                      About
                    </NavLink>{' '}
                  </li>
                  <li class='nav-item'>
                    <NavLink className='nav-link' to=''>
                      Logout
                    </NavLink>{' '}
                  </li>
                </ul>
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
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
