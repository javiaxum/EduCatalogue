import { format } from 'date-fns';
import { Grid, Icon, Image, Item, Segment } from 'semantic-ui-react';
import { Review } from '../../../../app/models/review';
import { uk, enUS } from 'date-fns/locale'
import { useTranslation } from 'react-i18next';
import RatingStars from '../../../../app/common/rating/RatingStars';

interface Props {
    review: Review;
}

export default function ReviewListItem({ review }: Props) {

    const { t, i18n } = useTranslation();

    return (
        <Segment style={{ minHeight: '9rem', maxWidth: '50rem', color: '#444' }}>
            <Item>
                <Item.Content>
                    <Grid>
                        <Grid.Column style={{ minWidth: '200px' }}>
                            <Item.Header as='h5'><Image src={review.author.avatar || '/assets/user.png'} avatar spaced='right' />{review.author.displayName}</Item.Header>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <RatingStars rating={review.rating} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            {format(review.createdAt, 'dd-MMM yyyy', { locale: i18n.language == 'ua' ? uk : enUS })}
                        </Grid.Column>
                    </Grid>
                    <Item.Description>{review.reviewMessage}</Item.Description>
                </Item.Content>
            </Item>
        </Segment >
    )
}