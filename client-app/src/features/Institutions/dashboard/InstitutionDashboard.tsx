import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import PaginationBar from '../../../app/common/pagination/PaginationBar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SearchParamsSideBar from '../search/SearchParamsSideBar';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore, specialtyStore } = useStore();
    const { setActiveMenuItem } = institutionStore;


    useEffect(() => {
        return () => { institutionStore.setActiveMenuItem('About'); }
    }, [institutionStore, setActiveMenuItem])

    // if ((institutionStore.loadingInitial || institutionStore.loading))  return <LoadingComponent content='Loading institutions...' />
    return (
        <Segment style={{ borderRadius: '0px', border: 'none', minWidth: '1300px' }}>
            <Grid style={{border: '0', margin: '0', minWidth: '1400px'}}>
                <Grid.Column style={{minWidth: '50px', width: '20%'}} stretched>
                </Grid.Column>
                <Grid.Column style={{minWidth: '500px', width: '52%'}}>
                    <InstitutionsList />
                    <PaginationBar />
                </Grid.Column>
                <Grid.Column style={{minWidth: '280px', width: '18%'}} stretched>
                    <SearchParamsSideBar />
                </Grid.Column>
                <Grid.Column style={{minWidth: '50px', width: '10%'}} stretched>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})