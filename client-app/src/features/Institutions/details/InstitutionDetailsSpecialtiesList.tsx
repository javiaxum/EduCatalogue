import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Item } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import SpecialtyListItem from '../../Specialties/SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const {institutionStore} = useStore();
    return (
        <Grid style={{width: '100%'}}>
            {institutionStore.selectedInstitution?.specialties.map((specialty) => (
                <SpecialtyListItem specialty={specialty} key={specialty.id} />
            ))}
        </Grid>
    )
})