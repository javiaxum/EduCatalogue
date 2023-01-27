import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { selectedInstitution, specialtyPredicate, branchPredicate } = institutionStore;
    const { editMode } = commonStore;

    if (!selectedInstitution || !selectedInstitution.specialties) return <></>;

    let filteredSpecialties = selectedInstitution.specialties;
    if (branchPredicate.size !== 0)
        filteredSpecialties = filteredSpecialties.filter((x) =>
            branchPredicate.has(x.localSpecialtyCode.slice(0, 2)));
    if (specialtyPredicate.size !== 0)
        filteredSpecialties = filteredSpecialties.filter((x) =>
            specialtyPredicate.has(x.localSpecialtyCode));

    return (
        <Grid style={{ padding: '10px' }}>
            <Grid.Column width={12}>
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
            <Grid.Column width={4}>
                <SearchParamsList />
            </Grid.Column>
        </Grid>
    )
})