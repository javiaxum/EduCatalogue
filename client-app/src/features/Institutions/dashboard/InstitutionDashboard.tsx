import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import PaginationBar from '../../../app/common/pagination/PaginationBar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import SearchParamsSideBar from '../search/SearchParamsSideBar';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore, specialtyStore } = useStore();
    const { setPagingParams, pagination, loadInstitutions } = institutionStore;
    

    useEffect(() => {
        if (institutionStore.institutionsRegistry.size <= 1) institutionStore.loadInstitutions();
        if (specialtyStore.specialtyCoreRegistry.size <= 1) specialtyStore.loadSpecialtyCores();

        return () => { institutionStore.setActiveMenuItem('About'); }
    }, [institutionStore, institutionStore.setActiveMenuItem])

    if ((institutionStore.loadingInitial || institutionStore.loading))  return <LoadingComponent content='Loading institutions...' />
    return (
        <Segment style={{ borderRadius: '0px', border: 'none' }}>
            <Grid>
                <Grid.Column width={12}>
                    <InstitutionsList />
                </Grid.Column>
                <Grid.Column width={4}>
                    <SearchParamsSideBar />
                </Grid.Column>
            </Grid>
            <PaginationBar/>
        </Segment>

    )
})