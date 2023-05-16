import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modals/ModalContainer';
import CustomFooter from './CustomFooter';
import NavBarMobile from './NavBarMobile';
import { useMediaQuery } from 'react-responsive';
import ModalImageContainer from '../common/modals/ModalImageContainer';
import { Button, Header, Icon, Transition } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import InstitutionComparisonBoard from '../../features/Institutions/comparison/InstitutionComparisonBoard';
import { router } from '../../features/routers/Routes';
import SpecialtyComparisonBoard from '../../features/Specialties/comparison/SpecialtyComparisonBoard';

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore, institutionStore, specialtyStore, profileStore: { loadProfile } } = useStore();
  const { selectedInstitutionIds, loadCitiesWithInstitutions: loadCitiesWithInstitutionsCount, loadInstitutions, loadRegionsWithCities, selectedInstitution } = institutionStore;
  const { loadSpecialtyCores, loadBranches, loadSkills, selectedSpecialtyIds } = specialtyStore;
  const [scrollY, setScrollY] = useState<number>(0);
  const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
  const { t } = useTranslation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname])

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().then(() => loadProfile(), () => userStore.logout());
    }
    commonStore.loadAppData();
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, [commonStore, commonStore.comparison, userStore, loadProfile, loadInstitutions, loadCitiesWithInstitutionsCount, loadSpecialtyCores, loadBranches, loadSkills, loadRegionsWithCities, institutionStore])

  return (
    <>
      {(location.pathname === '/institutions/comparison' || location.pathname === '/specialties/comparison') ?
        <div>
          {isComputerOrTablet &&
            <NavBar />}
          {isMobile &&
            <>
              <NavBarMobile />
              <div style={{ height: '5rem' }} />
            </>}
          {location.pathname === '/institutions/comparison' && <InstitutionComparisonBoard />}
          {location.pathname === '/specialties/comparison' && <SpecialtyComparisonBoard />}
        </div> :
        <div style={{ overflowX: (isComputerOrTablet && location.pathname !== '/') ? 'scroll' : 'hidden' }}>
          <ModalContainer />
          <ModalImageContainer />
          <ToastContainer
            position='bottom-right'
            hideProgressBar
            theme='colored' />
          {location.pathname === '/' ?
            <HomePage /> :
            <div style={{ backgroundColor: location.pathname === '/institutions' ? "#f3f3f3" : "#fff", minHeight: '100vh' }}>
              {isComputerOrTablet && <NavBar />}
              {isMobile &&
                <>
                  <NavBarMobile />
                  <div style={{ height: location.pathname === '/institutions' ? '6rem' : '5rem' }} />
                </>}
              <Outlet />
              <div style={{ left: isMobile ? '0' : '', width: isMobile ? '100%' : '22rem', position: 'fixed', bottom: 0, zIndex: 2000 }}>
                <Transition
                  visible={institutionStore.selectedInstitutionIds.length > 0 &&
                    location.pathname !== '/institutions/comparison' &&
                    location.pathname !== '/specialties/comparison'}
                  duration={500}
                  unmountOnhide
                  transitionOnMount>
                  <Button
                    style={{ backgroundColor: 'rgb(38, 94, 213)', position: 'relative', bottom: '0.1rem', borderRadius: '3px 3px 0 0' }}
                    as={Link}
                    to='/institutions/comparison'
                    onClick={() => commonStore.setComparison('institutions')}>
                    <Icon name='law' inverted style={{ display: 'inline-block' }} />
                    <Header inverted as='h4' style={{ display: 'inline-block', margin: 0 }}>
                      {t('Compare institutions')}: {institutionStore.selectedInstitutionIds.length}
                    </Header>
                  </Button>
                </Transition>
                <Transition
                  visible={specialtyStore.selectedSpecialtyIds.length > 0 &&
                    location.pathname !== '/institutions/comparison' &&
                    location.pathname !== '/specialties/comparison'}
                  duration={500}
                  unmountOnhide
                  transitionOnMount>
                  <Button
                    as={Link}
                    to='/specialties/comparison'
                    style={{ backgroundColor: 'rgb(38, 94, 213)', position: 'relative', botton: '0.1rem', borderRadius: '3px 3px 0 0' }}
                    onClick={() => commonStore.setComparison('specialties')}>
                    <Icon name='universal access' inverted style={{ display: 'inline-block' }} />
                    <Header inverted as='h4' style={{ display: 'inline-block', margin: 0 }}>
                      {t('Compare specialties')}: {specialtyStore.selectedSpecialtyIds.length}
                    </Header>
                  </Button>
                </Transition>
              </div>
              <Transition
                visible={scrollY > 600}
                duration={500}
                unmountOnhide
                transitionOnMount>
                <Button
                  style={{ width: '4rem', height: '4rem', backgroundColor: 'rgb(38, 94, 213)', position: 'fixed', right: 0, bottom: '7rem', zIndex: 1000, borderRadius: '3px' }}
                  type='button'
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Icon name='arrow up' size='large' inverted style={{ position: 'absolute', top: '1.2rem', left: '1.455rem' }} />
                </Button>
              </Transition>
            </div>}
          {location.pathname !== '/' && <CustomFooter />}
        </div>}
    </>
  );
})