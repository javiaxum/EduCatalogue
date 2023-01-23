import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Divider, Grid, Item, Segment } from 'semantic-ui-react';
import { Review } from '../../../../app/models/review';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import ReviewListItem from './ReviewListItem';

interface Props {
    reviews: Review[];
}

export default observer(function InstitutionDetailsSpecialtiesList({ reviews }: Props) {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { specialtyPredicate } = institutionStore;
    const { editMode } = commonStore;

    useEffect(() => {
    })

    return (
        <Grid>
            <Grid.Column width={13}>
                <Grid style={{ width: '100%', display: 'block', padding: '10px' }}>
                    <Item.Group divided>
                        {reviews.length === 0
                            ? (<>{!editMode && <Segment style={{ color: '#444', width: '300px' }}>There are no specialties available...</Segment>}</>)
                            : (<>
                                {reviews.map((review) => (
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