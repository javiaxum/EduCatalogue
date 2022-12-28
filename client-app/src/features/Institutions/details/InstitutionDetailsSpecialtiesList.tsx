import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import SpecialtyListAddNewItem from '../../Specialties/SpecialtyListAddNewItem';
import SpecialtyListItem from '../../Specialties/SpecialtyListItem';

export default function InstitutionDetailsSpecialtiesList() {
    const { institutionStore } = useStore();
    const { editMode } = institutionStore;

    if (institutionStore.selectedInstitution?.specialties.length === 0
        || !institutionStore.selectedInstitution?.specialties)
        return (<Segment style={{ color: '#444' }}>There are no specialties available...</Segment>)
    return (
        <Grid style={{ width: '100%', display: 'block' }}>
            {institutionStore.selectedInstitution.specialties.map((specialty) => (
                <SpecialtyListItem specialty={specialty} key={specialty.id} />
            ))}
            {editMode &&
                <SpecialtyListAddNewItem />}
        </Grid>
    )
}