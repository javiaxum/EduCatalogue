import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SearchParams from '../search/SearchParams';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore } = useStore();

    useEffect(() => {
        if (institutionStore.institutionsRegistry.size === 0) institutionStore.loadInstitutions();
    }, [institutionStore])

    if (institutionStore.loadingInitial || institutionStore.loading) return <LoadingComponent content='Loading institutions...' />
    return (
        <Segment style={{ borderRadius: '0px 0px 10px 10px' }}>
            <Grid>
                <Grid.Column width={12}>
                    <InstitutionsList />
                </Grid.Column>
                <Grid.Column width={4}>
                    <SearchParams />
                </Grid.Column>
            </Grid>
        </Segment>

    )
})