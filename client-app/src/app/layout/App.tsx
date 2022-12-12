import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function  App() {
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      <NavBar/>
      <Container>
        <Outlet/> 
      </Container>
    </>
  );
}

export default App;
