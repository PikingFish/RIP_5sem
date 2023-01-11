import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { store } from './app/store';
import './index.css';
import logo from './logo.svg';

import { AuthHeader, RequireAuth } from "./features/auth/Auth";
import { UserBody, UserHeader } from './pages/user/User';
import { AuthPageBody, AuthPageHeader } from './pages/auth/auth';
import { MainBody, MainHeader } from './pages/main/main';
import { doWhoami } from "./features/auth/authSlice";

function TemplateHeader({header}) {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} href="#">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Реакт Бутстрэп
        </Navbar.Brand>
        <div id="pageheader">
          {header}
        </div>
        <AuthHeader />
      </Container>
    </Navbar>
  );
}

function Template({header, body}) {
  return (
    <>
      <div id="header">
        <TemplateHeader header={header} />
      </div> 
      <div id="body">
        {body}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={
          <Template header={<AuthPageHeader />} body={<AuthPageBody />} />
        }/>
        <Route path="/user/:id" element={
          <RequireAuth>
            <Template header={<UserHeader />} body={<UserBody />} />
          </RequireAuth>
        }/>
        <Route path="/" element={
          <Template header={<MainHeader />} body={<MainBody />} />
        }/>
      </Routes>
    </Router>
  );
}

store.dispatch(doWhoami());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

