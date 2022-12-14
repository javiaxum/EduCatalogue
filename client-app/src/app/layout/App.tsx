import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import LoginForm from '../../features/identity/LoginForm';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded();
      })
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
