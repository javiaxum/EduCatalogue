import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Grid, Item, Segment, Image, Button, Icon, Divider, Select } from 'semantic-ui-react';
import { reviewSortingOptions } from '../../../../app/common/options/reviewSortingOptions';
import { Institution, InstitutionFormValues } from '../../../../app/models/institution';
import { Review } from '../../../../app/models/review';
import { useStore } from '../../../../app/stores/store';
import ReviewForm from './ReviewForm';
import ReviewListItem from './ReviewListItem';


export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore, userStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { specialtyPredicate, reviewForm, setReviewForm, selectedInstitution } = institutionStore;
    const { editMode } = commonStore;
    const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
    const [sorting, setSorting] = useState<string>(reviewSortingOptions[0].text);

    if(!selectedInstitution || !selectedInstitution.reviews) return <></>

    let buttons = [];
    for (let i = 1; i <= 5; i++) {
        let icons = [];
        for (let j = 1; j <= 5 - i + 1; j++) {
            icons.push((<Icon color='yellow' name='star' />))
        }
        for (let k = 1; k <= i - 1; k++) {
            icons.push((<Icon color='yellow' name='star outline' />))
        }
        buttons.push((<Button
            basic
            key={5 - i + 1}
            active={selectedRating === 5 - i + 1}
            disabled={!!!selectedInstitution.reviews.find((x) => x.rating === 5 - i + 1)}
            onClick={() => {
                selectedRating === 5 - i + 1 ? setSelectedRating(undefined) : setSelectedRating(5 - i + 1);
            }}>
            {icons}</Button>))
    }

    function compareReviewByDate(a: Review, b: Review) {
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
    function compareReviewByRatingDescending(a: Review, b: Review) {
        return a.rating - b.rating;
    }
    function compareReviewByRating(a: Review, b: Review) {
        return b.rating - a.rating;
    }

    let sortedReviews = sorting === reviewSortingOptions[0].text
        ? selectedInstitution.reviews.slice().sort(compareReviewByDate)
        : sorting === reviewSortingOptions[1].text
            ? selectedInstitution.reviews.slice().sort(compareReviewByRating)
            : selectedInstitution.reviews.slice().sort(compareReviewByRatingDescending);

    return (
        <Grid style={{ padding: '20px', minWidth: '1000px' }}>
            {!reviewForm && <Grid.Column width={16} style={{ padding: '0' }}>
                {buttons}
                <Select
                    options={reviewSortingOptions}
                    value={sorting}
                    onChange={(e, d) => {
                        setSorting(d.value as string)
                    }} />
            </Grid.Column>}
            <Grid.Column width={16} style={{ padding: '0' }}>
            </Grid.Column>
            <Grid.Column width={9}>
                <Grid style={{ padding: '20px 0 0 0' }}>
                    <Item.Group divided>
                        <Item>
                            <Item.Content>
                                {
                                    !!!selectedInstitution.reviews.find((x) => x.author.username === userStore.user?.username) && <>
                                        {!reviewForm ? <Button
                                            positive
                                            content='Add review'
                                            style={{ marginLeft: '', backgroundColor: 'rgb(30, 71, 160)' }}
                                            onClick={() => setReviewForm(true)} />
                                            : <ReviewForm />}
                                    </>
                                }
                            </Item.Content>
                        </Item>
                        {sortedReviews && sortedReviews.length > 0
                            ? (<>
                                {sortedReviews.filter((x) => x.rating === selectedRating || selectedRating === undefined).map((review) => (
                                    <ReviewListItem
                                        review={review}
                                        key={review.id} />
                                ))}
                            </>)
                            : (<>{!editMode && <Segment style={{ color: '#444', width: '300px' }}>There are no specialties available...</Segment>}</>)}
                    </Item.Group>
                </Grid>
            </Grid.Column>
            <Grid.Column width={6}>
                <Image src={'/assets/institutionTitleImagePlaceholder.png'} style={{ filter: 'brightness(50%)', height: '22em', objectFit: 'cover', right: '-200px' }} />
            </Grid.Column>
        </Grid>
    )
})