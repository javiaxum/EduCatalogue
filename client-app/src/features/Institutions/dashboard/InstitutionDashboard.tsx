import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SearchParamsSideBar from '../search/SearchParamsSideBar';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore } = useStore();

    useEffect(() => {
        if (institutionStore.institutionsRegistry.size <= 1) institutionStore.loadInstitutions();
        return () => { institutionStore.setActiveMenuItem('About'); }
    }, [institutionStore, institutionStore.setActiveMenuItem])

    if (institutionStore.loadingInitial || institutionStore.loading) return <LoadingComponent content='Loading institutions...' />
    return (
        <Segment style={{ borderRadius: '0px 0px 10px 10px' }}>
            <Grid>
                <Grid.Column width={12}>
                    <InstitutionsList />
                </Grid.Column>
                <Grid.Column width={4}>
                    <SearchParamsSideBar />
                </Grid.Column>
            </Grid>
        </Segment>

    )
})