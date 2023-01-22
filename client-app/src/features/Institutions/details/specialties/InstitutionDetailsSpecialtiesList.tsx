import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { selectedInstitution, specialtyPredicate } = institutionStore;
    const { editMode } = commonStore;

    if (!selectedInstitution || !selectedInstitution.specialties) return <></>;

    let filteredSpecialties = selectedInstitution.specialties.filter((x) => specialtyPredicate.size !== 0 || specialtyPredicate.has(x.localSpecialtyCode))

    return (
        <Grid style={{ padding: '10px' }}>
            <Grid.Column width={12}>
                <Grid >
                    {filteredSpecialties.length == 0
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

        //     <Segment as={Link} to={`/specialties/${specialty.id}`} className='specialtyCard' style={{ display: 'block', height: '240px' }}>
        //     <Item>
        //         <Item.Content>
        //             <Item.Header>{specialtyCore.name.slice(0, 40)} {specialtyCore.name.length > 40 && '...'}</Item.Header>
        //             <Item.Description>UA specialty code: {specialtyCore.id}</Item.Description>
        //             <Item.Description>ISCED specialty code: {iscedCodeString}</Item.Description>
        //             <Item.Description>{specialty.description.slice(0, 50)}</Item.Description>
        //         </Item.Content>
        //     </Item>
        // </Segment>
    )
})