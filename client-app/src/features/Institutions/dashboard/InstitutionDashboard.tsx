import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Segment } from 'semantic-ui-react';
import PaginationBar from '../../../app/common/pagination/PaginationBar';
import { InstitutionsPagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import SearchParamsSideBar from '../search/SearchParamsSideBar';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore, commonStore } = useStore();
    const { setPagingParams, setActiveMenuItem, pagination, loadInstitutions, institutionsRegistry } = institutionStore;

    useEffect(() => {
        return () => { institutionStore.setActiveMenuItem('About'); commonStore.setSidebarOpened(false) }
    }, [institutionStore, setActiveMenuItem, commonStore.setSidebarOpened])

    function handleLoad(i: number) {
        setPagingParams(new InstitutionsPagingParams(i));
        institutionsRegistry.clear();
        loadInstitutions();
    }

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ margin: 0, minWidth: '75rem' }}>
                    <Grid.Column style={{ minWidth: '50px', width: '11%' }} stretched>
                    </Grid.Column>
                    <Grid.Column style={{ minWidth: '32rem', width: '58%' }}>
                        <InstitutionsList />
                        <Container style={{ textAlign: 'center', paddingTop: '2rem' }}>
                            <PaginationBar handleLoad={handleLoad} pagination={pagination} />
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
                            <PaginationBar handleLoad={handleLoad} pagination={pagination} />
                        </Container>
                    </Grid.Column>
                </Grid>}
        </>
    )
})