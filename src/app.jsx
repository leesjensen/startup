import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Service from './service';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';

export default function App() {
  const [activeUser, setActiveUser] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = Service.getUser();
    if (user) {
      setActiveUser(user);
    }
  }, []);

  function changeUser(user) {
    setActiveUser(user);
    if (user) {
      navigate('/play');
    } else {
      navigate('/');
    }
  }

  function AppHeader({ activeUser }) {
    return (
      <header>
        <nav className='navbar navbar-expand bg-body-tertiary'>
          <div className='container-fluid'>
            <a className='navbar-brand'>
              <img src='logo.svg' className='logo d-inline-block align-top' alt='Calmer logo' />
              almer
            </a>
            <div className='navbar-nav'>
              {activeUser ? (
                <>
                  <NavLink className='nav-link' to='play'>
                    Play
                  </NavLink>
                  <NavLink className='nav-link' to='logout'>
                    Logout
                  </NavLink>
                </>
              ) : (
                <NavLink className='nav-link' to=''>
                  Login
                </NavLink>
              )}
              <NavLink className='nav-link' to='about'>
                About
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  function AppFooter({ activeUser }) {
    return (
      <footer>
        <nav className='navbar sticky-bottom bg-body-tertiary'>
          <div className='container-fluid'>
            <span>
              <img src='logo-github.svg' alt='GitHub logo' />
              <a className='navbar-text' href='https://github.com/leesjensen/startup'>
                GitHub
              </a>
            </span>
            <div>calming {activeUser?.email ?? 'the silence'}</div>
            <span className='navbar-text'>Lee S Jensen</span>
          </div>
        </nav>
      </footer>
    );
  }

  return (
    <div>
      <AppHeader activeUser={activeUser} />
      <Routes>
        <Route path='/' element={<Login changeUser={changeUser} exact />} />
        <Route path='/logout' element={<Logout changeUser={changeUser} />} />
        <Route path='/play' element={<Play activeUser={activeUser} />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <AppFooter activeUser={activeUser} />
    </div>
  );
}

function Logout({ changeUser }) {
  React.useEffect(() => {
    Service.logout();
    changeUser(null);
  }, []);
}

function NotFound() {
  return <main className='container bg-warning text-center'>404: Return to sender. Address unknown.</main>;
}
