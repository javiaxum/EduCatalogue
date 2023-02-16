import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import CustomFooter from './CustomFooter';

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore, institutionStore, specialtyStore, profileStore: { loadProfile } } = useStore();
  const { loadCitiesWithInstitutions: loadCitiesWithInstitutionsCount, loadInstitutions, loadRegionsWithCities } = institutionStore;
  const { loadSpecialtyCores, loadBranches } = specialtyStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().then(() => commonStore.loadAppData(), () => userStore.logout());
    }
  }, [commonStore, userStore, loadProfile, loadInstitutions, loadCitiesWithInstitutionsCount, loadSpecialtyCores, loadBranches, loadRegionsWithCities, institutionStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <Fragment>
          <NavBar />
          <Container style={{ minHeight: 'calc(100vh - 140px)' }} >
            <Outlet />
          </Container>
        </Fragment>
      )}
      <CustomFooter />
    </>
  );
})