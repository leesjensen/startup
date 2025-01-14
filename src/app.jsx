import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { About } from './about/about';

export default function App() {
  const [activeUser, setActiveUser] = React.useState(null);

  function AppHeader({ activeUser }) {
    return (
      <header>
        <nav className="navbar navbar-expand bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img src="logo.svg" className="logo d-inline-block align-top" alt="Calmer logo" />
              almer
            </a>
            <div className="navbar-nav">
              {activeUser && (
                <NavLink className="nav-link" to="play">
                  Play
                </NavLink>
              )}
              <NavLink className="nav-link" to="about">
                About
              </NavLink>
              {activeUser ? (
                <NavLink className="nav-link" to="logout">
                  Logout
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }

  function AppFooter({ activeUser }) {
    return (
      <footer>
        <nav className="navbar sticky-bottom bg-body-tertiary">
          <div className="container-fluid">
            <span>
              <img src="logo-github.svg" alt="GitHub logo" />
              <a className="navbar-text" href="https://github.com/leesjensen/startup">
                GitHub
              </a>
            </span>
            <div>calming {activeUser ?? 'the silence'}</div>
            <span className="navbar-text">Lee S Jensen</span>
          </div>
        </nav>
      </footer>
    );
  }

  return (
    <BrowserRouter>
      <AppHeader activeUser={activeUser} />
      <Routes>
        <Route path="/" element={<Login setActiveUser={setActiveUser} />} />
        <Route path="/logout" element={<Logout setActiveUser={setActiveUser} />} />
        <Route path="/play" element={<Play username={activeUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AppFooter activeUser={activeUser} />
    </BrowserRouter>
  );
}

function Logout({ setActiveUser }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    setActiveUser(null);
    navigate('/');
  }, []);
}

function NotFound() {
  return <main className="container bg-warning text-center">404: Return to sender. Address unknown.</main>;
}
