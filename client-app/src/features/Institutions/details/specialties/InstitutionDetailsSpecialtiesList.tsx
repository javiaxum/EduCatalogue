import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore } = useStore();
    const { editMode } = commonStore;

    return (
        <Grid style={{ width: '100%', display: 'block' }}>
            {institutionStore.selectedInstitution?.specialties.length === 0
                || !institutionStore.selectedInstitution?.specialties
                ? (<>{!editMode && <Segment style={{ color: '#444' }}>There are no specialties available...</Segment>}</>)
                : (<>
                    {institutionStore.selectedInstitution.specialties.map((specialty) => (
                        <SpecialtyListItem specialty={specialty} key={specialty.id} />
                    ))}
                </>
                )}
            {editMode &&
                <SpecialtyListAddNewItem />}
        </Grid>
    )
})