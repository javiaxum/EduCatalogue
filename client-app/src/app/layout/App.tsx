import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <div
      className='scrollableDiv'
      style={{
        overflow: isComputerOrTablet ? 'scroll' : 'hidden',
        height: location.pathname === '/institutions' ? '120vh' : ''
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
          {isMobile && <NavBarMobile />}
          <Outlet />
        </div>}
      {location.pathname !== '/' && <CustomFooter />}
    </div>
  );
})