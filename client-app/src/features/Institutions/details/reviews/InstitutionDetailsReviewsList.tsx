import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider, Grid, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import ReviewListItem from './ReviewListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { selectedInstitution, specialtyPredicate } = institutionStore;
    const { editMode } = commonStore;

    return (
        <Grid>
            <Grid.Column width={13}>
                <Grid style={{ width: '100%', display: 'block', padding: '10px' }}>
                    <Item.Group divided>
                        {selectedInstitution?.reviews.length === 0
                            || !selectedInstitution?.reviews
                            ? (<>{!editMode && <Segment style={{ color: '#444', width: '300px' }}>There are no specialties available...</Segment>}</>)
                            : (<>
                                {selectedInstitution.reviews.map((review) => (
                                    <ReviewListItem
                                        review={review}
                                        key={review.id} />
                                ))}
                            </>)}
                    </Item.Group>
                </Grid>
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