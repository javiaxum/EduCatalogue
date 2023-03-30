import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Container, Dimmer, Grid, Icon, Pagination, Segment, Transition } from 'semantic-ui-react';
import PaginationBar from '../../../app/common/pagination/PaginationBar';
import { InstitutionsPagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import SearchParamsList from '../search/SearchParamsList';
import SearchParamsSideBar from '../search/SearchParamsSideBar';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore, commonStore } = useStore();
    const { setInstitutionPagingParams,
        institutionPagination,
        loadInstitutions,
        institutionsRegistry,
        setActiveMenuItem } = institutionStore;
    const [scrollY, setScrollY] = useState<number>(0);
    const [rightSidebar, setRightSidebar] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
    }, [])
    useEffect(() => {
        if (institutionsRegistry.size === 0)
            loadInstitutions();
        institutionStore.clearImages();
        setActiveMenuItem('About');
    }, [institutionStore, commonStore, setActiveMenuItem, institutionsRegistry.size, loadInstitutions])


    function handleLoad(i: number) {
        setInstitutionPagingParams(new InstitutionsPagingParams(i));
        institutionsRegistry.clear();
        loadInstitutions();
    }

    const { t } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <div style={{ backgroundColor: '#f3f3f3' }}>
            <Transition
                visible={rightSidebar}
                animation='fade left'
                timeout={400}
                unmountOnExit>
                <Segment style={{ position: 'fixed', zIndex: 2000, borderRadius: 0 }}>
                    <Button
                        basic
                        floated='right'
                        style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '1rem', height: '1rem', top: 0, right: '1rem' }}
                        onClick={() => setRightSidebar(false)}>
                        <Icon name='close' size='large' style={{ left: '0.25rem', bottom: '0.05rem', position: 'relative' }} />
                    </Button>
                    <SearchParamsList />
                </Segment>
            </Transition>
            <Transition
                style={{ zIndex: 1000, position: 'fixed', width: '100%', height: '100%' }}
                visible={rightSidebar}
                duration={500}>
                <Dimmer active={rightSidebar} style={{ zIndex: 1000, position: 'fixed', width: '100%', height: '100%' }} />
            </Transition>
            {isComputerOrTablet &&
                <Grid style={{ margin: 0, minWidth: '85rem', backgroundColor: "#f3f3f3", marginLeft: 'auto', marginRight: 'auto', maxWidth: '85rem' }}>
                    <Grid.Column style={{ width: '11%' }}>
                    </Grid.Column>
                    <Grid.Column style={{ width: '58%' }}>
                        <InstitutionsList />
                        <Container style={{ textAlign: 'center', paddingTop: '2rem' }}>
                            {institutionPagination &&
                                <Pagination
                                    totalPages={institutionPagination.totalPages}
                                    activePage={institutionPagination.currentPage}
                                    onPageChange={(e, data) => handleLoad(data.activePage as number)} />}
                        </Container>
                    </Grid.Column>
                    <Grid.Column style={{ minWidth: '22rem', maxWidth: '30rem' }}>
                        <SearchParamsSideBar />
                        <Transition
                            visible={scrollY > 200}
                            duration={250}
                            unmountOnhide
                            transitionOnMount>
                            <div style={{ position: 'fixed', top: 0, width: '20rem' }}>
                                <SearchParamsSideBar />
                            </div>
                        </Transition>
                    </Grid.Column>
                    <Grid.Column style={{ width: '5%' }} >
                    </Grid.Column>
                </Grid>}
            {isMobile &&
                <Grid style={{ margin: 0 }}>
                    <Grid.Row style={{ margin: 0, padding: 0 }} stretched>
                        <Button
                            style={{ width: '100%', position: 'fixed', top: '9rem', zIndex: 100 }}
                            onClick={() => setRightSidebar(true)}>
                            <Icon name='options' size='big' />
                            {t('Filters')}
                        </Button>
                        {institutionPagination &&
                            <Pagination
                                style={{ margin: '7rem auto 0 auto' }}
                                totalPages={institutionPagination.totalPages}
                                activePage={institutionPagination.currentPage}
                                onPageChange={(e, data) => { handleLoad(data.activePage as number); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />}
                        <div style={{ height: '6rem' }}>

                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <InstitutionsList />
                    </Grid.Row>
                    <Grid.Row>
                        {institutionPagination &&
                            <Pagination
                                style={{ margin: '1rem auto 0 auto' }}
                                totalPages={institutionPagination.totalPages}
                                activePage={institutionPagination.currentPage}
                                onPageChange={(e, data) => { handleLoad(data.activePage as number); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />}
                    </Grid.Row>
                    <Grid.Row>

                    </Grid.Row>
                </Grid>}
        </div >
    )
})