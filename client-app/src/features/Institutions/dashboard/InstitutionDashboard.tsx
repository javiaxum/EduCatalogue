import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Pagination } from 'semantic-ui-react';
import PaginationBar from '../../../app/common/pagination/PaginationBar';
import { InstitutionsPagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import SearchParamsSideBar from '../search/SearchParamsSideBar';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore, commonStore } = useStore();
    const { setInstitutionPagingParams,
        institutionPagination,
        loadInstitutions,
        institutionsRegistry,
        setActiveMenuItem } = institutionStore;

    useEffect(() => {
        institutionStore.clearImages();
        setActiveMenuItem('About');
        return () => { commonStore.setSidebarOpened(false) }
    }, [institutionStore, commonStore.setSidebarOpened, commonStore, setActiveMenuItem])

    function handleLoad(i: number) {
        setInstitutionPagingParams(new InstitutionsPagingParams(i));
        institutionsRegistry.clear();
        loadInstitutions();
    }

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <div style={{ backgroundColor: '#f3f3f3' }}>
            {isComputerOrTablet &&
                <Grid style={{ margin: 0, minWidth: '85rem', backgroundColor: "#f3f3f3", marginLeft: 'auto', marginRight: 'auto', maxWidth: '85rem' }}>
                    <Grid.Column style={{ minWidth: '50px', width: '11%' }}>
                    </Grid.Column>
                    <Grid.Column style={{ minWidth: '32rem', width: '58%' }}>
                        <InstitutionsList />
                        <Container style={{ textAlign: 'center', paddingTop: '2rem' }}>
                            <Pagination
                                totalPages={institutionPagination?.totalPages!}
                                activePage={institutionPagination?.currentPage}
                                onPageChange={(e, data) => handleLoad(data.activePage as number)} />
                        </Container>
                    </Grid.Column>
                    <Grid.Column style={{ minWidth: '22rem', maxWidth: '30rem' }}>
                        <SearchParamsSideBar />
                    </Grid.Column>
                    <Grid.Column style={{ width: '5%' }} >
                    </Grid.Column>
                </Grid>}
            {isMobile &&
                <Grid style={{ margin: 0 }} >
                    <Grid.Column style={{ margin: 0, padding: 0 }} stretched>
                        <Container style={{ textAlign: 'center' }}>
                            <Pagination
                                totalPages={institutionPagination?.totalPages!}
                                activePage={institutionPagination?.currentPage}
                                onPageChange={(e, data) => handleLoad(data.activePage as number)} />
                        </Container>
                        <InstitutionsList />
                        <Container style={{ textAlign: 'center' }}>
                            <Pagination
                                totalPages={institutionPagination?.totalPages!}
                                activePage={institutionPagination?.currentPage}
                                onPageChange={(e, data) => handleLoad(data.activePage as number)} />
                        </Container>
                    </Grid.Column>
                </Grid>}
        </div>
    )
})