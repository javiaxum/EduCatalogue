import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SearchParams from '../search/SearchParams';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore } = useStore();

    useEffect(() => {
        if (institutionStore.institutionsRegistry.size === 0) institutionStore.loadInstitutions();
    }, [institutionStore])

    if (institutionStore.loadingInitial) return <LoadingComponent content='Loading institutions...' />
    return (
        <Segment>
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