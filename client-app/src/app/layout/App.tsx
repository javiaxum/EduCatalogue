import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import CustomFooter from './CustomFooter';
import NavBarMobile from './NavBarMobile';
import { useMediaQuery } from 'react-responsive';
import ImageModal from '../../features/Institutions/details/gallery/ImageModal';
import ModalImageContainer from '../common/modals/ModalImageContainer';
import { Button, Divider, Transition } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore, institutionStore, specialtyStore, profileStore: { loadProfile } } = useStore();
  const { loadCitiesWithInstitutions: loadCitiesWithInstitutionsCount, loadInstitutions, loadRegionsWithCities } = institutionStore;
  const { loadSpecialtyCores, loadBranches, loadSkills } = specialtyStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().then(() => loadProfile(), () => userStore.logout());
    }
    commonStore.loadAppData();
  }, [commonStore, userStore, loadProfile, loadInstitutions, loadCitiesWithInstitutionsCount, loadSpecialtyCores, loadBranches, loadSkills, loadRegionsWithCities, institutionStore])

  const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

  const { t } = useTranslation();
  // if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <div
      className='scrollableDiv'
      style={{
        overflow: isComputerOrTablet ? 'scroll' : 'hidden',
        height: (location.pathname === '/institutions' && !isMobile) ? '120vh' : ''
      }}>
      <ModalContainer />
      <ModalImageContainer />
      <ToastContainer
        position='bottom-right'
        hideProgressBar
        theme='colored' />
      {location.pathname === '/' ?
        <HomePage /> :
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: location.pathname === '/institutions' ? "#f3f3f3" : "#fff"
          }}>
          {isComputerOrTablet && <NavBar />}
          {isMobile &&
            <>
              <NavBarMobile />
              <div style={{ height: location.pathname === '/institutions' ? '6rem' : '4rem' }} />
            </>}
          <Outlet />
          <Transition
            visible={institutionStore.selectedInstitutionIds.length > 0}
            duration={500}
            unmountOnhide
            transitionOnMount>
            <Button.Group>
              <Button
                color='facebook'
                size='huge'
                as={Link}
                to='/institutions/comparison'
                style={{ position: 'fixed', right: '10rem', bottom: '0.1rem', zIndex: 1000, borderRadius: '3px 3px 0 0' }}>
              </Button>
              <Button
                color='facebook'
                size='huge'
                as={Link}
                to='/institutions/comparison'
                style={{ position: 'fixed', right: '10rem', bottom: '0.1rem', zIndex: 1000, borderRadius: '3px 3px 0 0' }}>
                {t('Institutions chosen')}: {institutionStore.selectedInstitutionIds.length} {t('Compare Institutions')}
              </Button>
            </Button.Group>
          </Transition>
        </div>}
      {location.pathname !== '/' && <CustomFooter />}
    </div>
  );
})