import React from 'react';
import { Grid, Item, Image, Header } from 'semantic-ui-react';
import { Review } from '../../app/models/review';
import { useStore } from '../../app/stores/store';
import ReviewListItem from '../Institutions/details/reviews/ReviewListItem';

interface Props {
    reviews: Review[];
}

export default function ProfileReviews({ reviews }: Props) {
    const { institutionStore } = useStore();

    return (
        <Item.Group>
            {reviews.map((review) =>
                <Grid>
                    <Grid.Column width={10}>
                        <ReviewListItem review={review} key={review.id} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Header as='h4' content={institutionStore.institutionsRegistry.get(review.institutionId)?.name} />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Image src={institutionStore.institutionsRegistry.get(review.institutionId)?.titleImage || '/assets/user.png'} avatar style={{ height: '5rem', width: '5rem' }} spaced='right' />
                    </Grid.Column>
                </Grid>
            )}
        </Item.Group>
    )
}