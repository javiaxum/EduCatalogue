import React, { Fragment, useEffect } from 'react';
import { Button, Container, Grid, Segment } from 'semantic-ui-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import CustomFooter from './CustomFooter';
import languageDetector from 'i18next-browser-languagedetector';
import { useTranslation } from 'react-i18next';
import NavBarMobile from './NavBarMobile';
import { useMediaQuery } from 'react-responsive';

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore, institutionStore, specialtyStore, profileStore: { loadProfile } } = useStore();
  const { loadCitiesWithInstitutions: loadCitiesWithInstitutionsCount, loadInstitutions, loadRegionsWithCities } = institutionStore;
  const { loadSpecialtyCores, loadBranches, loadSkills } = specialtyStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().then(() => loadProfile(), () => userStore.logout());
    }
    commonStore.loadAppData()
  }, [commonStore, userStore, loadProfile, loadInstitutions, loadCitiesWithInstitutionsCount, loadSpecialtyCores, loadBranches, loadSkills, loadRegionsWithCities, institutionStore])

  const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <div style={{ overflow: isComputerOrTablet ? 'scroll' : 'hidden' }}>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ?
        <HomePage /> :
        <div style={{ minHeight: '100vh', backgroundColor: location.pathname === '/institutions' ? "#f3f3f3" : "#fff" }}>
          {isComputerOrTablet && <NavBar />}
          {isMobile && <NavBarMobile />}
          <Outlet />
          {specialtyStore.selectedSpecialtyIds.length > 0 &&
            <Button
              color='facebook'
              size='huge'
              as={Link}
              to='/specialties/comparison'
              style={{ position: 'fixed', right: '10rem', bottom: '1rem', zIndex: 1000 }}>
              Compare {specialtyStore.selectedSpecialtyIds.length} specialties
            </Button>}
        </div>
      }
      {location.pathname !== '/' && <CustomFooter />}
    </div>
  );
})