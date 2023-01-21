import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../search/SearchParamsList';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { selectedInstitution } = institutionStore;
    const { editMode } = commonStore;

    return (
        <Grid style={{ width: '100%', display: 'block', padding: '10px' }}>
            <Grid.Column width={12}>
                {selectedInstitution?.specialties.length === 0
                    || !selectedInstitution?.specialties
                    ? (<>{!editMode && <Segment style={{ color: '#444', width: '300px' }}>There are no specialties available...</Segment>}</>)
                    : (<>
                        {selectedInstitution!.specialties.map((specialty) => (
                            <SpecialtyListItem
                                specialty={specialty}
                                specialtyCore={getSpecialtyCore(specialty.localSpecialtyCode)!}
                                key={specialty.id}
                                iscedCodeString={getSpecialtyCoreISCEDString(specialty.localSpecialtyCode)} />
                        ))}
                    </>
                    )}
                {editMode &&
                    <SpecialtyListAddNewItem />}
            </Grid.Column>
            <Grid.Column width={4}>
                <SearchParamsList/>
            </Grid.Column>
        </Grid>
    )
})