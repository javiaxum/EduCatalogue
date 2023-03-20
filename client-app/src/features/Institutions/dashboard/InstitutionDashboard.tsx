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
    const { setInstitutionPagingParams: setPagingParams, institutionPagination: pagination, loadInstitutions, institutionsRegistry } = institutionStore;

    useEffect(() => {
        return () => { commonStore.setSidebarOpened(false) }
    }, [institutionStore, commonStore.setSidebarOpened, commonStore])

    function handleLoad(i: number) {
        setPagingParams(new InstitutionsPagingParams(i));
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
                                totalPages={pagination?.totalPages!}
                                activePage={pagination?.currentPage}
                                onPageChange={(e, data) => handleLoad(data.activePage as number)} />
                        </Container>
                    </Grid.Column>
                    <Grid.Column style={{ minWidth: '22rem', maxWidth: '30rem' }} >
                        <SearchParamsSideBar />
                    </Grid.Column>
                    <Grid.Column style={{ width: '5%' }} >
                    </Grid.Column>
                    {institutionStore.selectedInstitutionIds.length > 0 &&
                        <Button
                            color='facebook'
                            size='huge'
                            as={Link}
                            to='/institutions/comparison'
                            style={{ position: 'fixed', right: '10rem', bottom: '1rem', zIndex: 1000 }}>
                            Compare {institutionStore.selectedInstitutionIds.length}
                        </Button>}
                </Grid>}
            {isMobile &&
                <Grid style={{ margin: 0 }} >
                    <Grid.Column style={{ margin: 0, padding: 0 }} stretched>
                        <InstitutionsList />
                        <Container style={{ textAlign: 'center' }}>
                            <Pagination
                                totalPages={pagination?.totalPages!}
                                activePage={pagination?.currentPage}
                                onPageChange={(e, data) => handleLoad(data.activePage as number)} />
                        </Container>
                    </Grid.Column>
                </Grid>}
        </div>
    )
})