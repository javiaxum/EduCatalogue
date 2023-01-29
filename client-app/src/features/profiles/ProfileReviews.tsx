import React from 'react';
import { Grid, Item, Image, Header, Divider, Segment } from 'semantic-ui-react';
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
                <Segment.Group>
                    <Segment key={review.id}>
                        <Grid>
                            <Grid.Column width={2} style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
                                <Image src={institutionStore.institutionsRegistry.get(review.institutionId)?.titleImageUrl || '/assets/user.png'} avatar style={{ minHeight: '5rem', minWidth: '5rem' }} spaced='right' />
                            </Grid.Column>
                            <Grid.Column width={10} style={{ padding: '2.5rem 0 0 1.5rem' }} >
                                <Header as='h4' content={institutionStore.institutionsRegistry.get(review.institutionId)?.name} />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment>
                        <ReviewListItem review={review} key={review.id} />
                    </Segment>
                </Segment.Group>
            )}
        </Item.Group>
    )
}