import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString, selectedBranches, selectedSpecialties } = specialtyStore;
    const { selectedInstitution } = institutionStore;
    const { editMode } = commonStore;

    if (!selectedInstitution || !selectedInstitution.specialties) return <></>;

    let filteredSpecialties = selectedInstitution.specialties;
    if (selectedBranches.length !== 0)
        filteredSpecialties = filteredSpecialties.filter((specialty) =>
            selectedBranches.includes(specialty.localSpecialtyCode.slice(0, 2)))
    if (selectedSpecialties.length !== 0)
        filteredSpecialties = filteredSpecialties.filter((specialty) =>
            selectedSpecialties.includes(specialty.localSpecialtyCode))
    return (
        <Grid style={{ padding: '10px' }}>
            <Grid.Column style={{ minWidth: '500px', width: '69%' }}>
                <Grid >
                    {filteredSpecialties.length === 0
                        ? <Segment style={{ color: '#444', width: '300px' }}>There are no specialties available...</Segment>
                        : (
                            <>
                                {filteredSpecialties.map((specialty) => (
                                    <SpecialtyListItem
                                        specialty={specialty}
                                        specialtyCore={getSpecialtyCore(specialty.localSpecialtyCode)!}
                                        key={specialty.id}
                                        iscedCodeString={getSpecialtyCoreISCEDString(specialty.localSpecialtyCode)} />
                                ))}
                            </>
                        )}
                    {editMode &&
                        <Grid.Column style={{ width: '245px' }}>
                            <SpecialtyListAddNewItem />
                        </Grid.Column>
                    }
                </Grid>
            </Grid.Column>
            <Grid.Column floated='right' style={{ minWidth: '300px', width: '18%' }}>
                <SearchParamsList />
            </Grid.Column>
        </Grid>
    )
})