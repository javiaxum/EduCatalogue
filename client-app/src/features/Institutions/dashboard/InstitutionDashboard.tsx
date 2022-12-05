import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const { institutionStore } = useStore();

    useEffect(() => {
        if (institutionStore.institutionsRegistry.size === 0) institutionStore.loadInstitutions();
    }, [institutionStore])

    if (institutionStore.loadingInitial) return <LoadingComponent content='Loading institutions...' />
    return (
        <Grid>
            <Grid.Column width={10}>
                <InstitutionsList />
            </Grid.Column>
        </Grid>
    )
})