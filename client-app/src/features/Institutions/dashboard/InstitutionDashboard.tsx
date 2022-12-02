import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';
import InstitutionDetails from '../details/InstitutionDetails';
import InstitutionForm from '../form/InstitutionForm';
import InstitutionsList from './InstitutionsList';

export default observer(function InstitutionDashboard() {
    const {institutionStore} = useStore();
    return (
        <Grid>
            <Grid.Column width={10}>
                <InstitutionsList />
            </Grid.Column>
            <Grid.Column width={6}>
                {institutionStore.selectedInstitution && !institutionStore.editMode &&
                    <InstitutionDetails />}
                {institutionStore.editMode &&
                    <InstitutionForm />}
            </Grid.Column>
        </Grid>
    )
})