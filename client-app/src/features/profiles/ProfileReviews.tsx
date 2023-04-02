import React from 'react';
import { Grid, Item, Image, Header, Divider, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { Review } from '../../app/models/review';
import { useStore } from '../../app/stores/store';
import ReviewListItem from '../Institutions/details/reviews/ReviewListItem';
import { useTranslation } from 'react-i18next';

interface Props {
    profile: Profile;
}

export default function ProfileReviews({ profile }: Props) {
    const { t } = useTranslation();

    return (
        <>
            {!profile.reviews || profile.reviews.length === 0
                ? <Segment basic content={t('You have no reviews submitted') + '...'} />
                : <Segment.Group>
                    {profile.reviews.map((review) =>
                        <>
                            <Segment key={review.id}>
                                <Grid>
                                    <Grid.Column style={{ padding: '0.5rem 1rem 1rem 1rem', minWidth: '5rem' }}>
                                        <Image
                                            src={review.titleImageUrl || '/assets/user.png'}
                                            style={{ minHeight: '5rem', minWidth: '5rem', borderRadius: '5px' }}
                                            spaced='right' />
                                    </Grid.Column>
                                    <Grid.Column width={10} style={{ padding: '2.5rem 0 0 1.5rem' }} >
                                        <Header as='h4' content={review.institutionName} />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <ReviewListItem avatar={profile.avatar?.url} review={review} key={review.id+'LI'} />
                        </>
                    )}</Segment.Group>
            }
        </>
    )
}