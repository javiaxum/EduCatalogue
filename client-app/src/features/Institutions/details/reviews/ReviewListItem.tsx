import { format } from 'date-fns';
import { Grid, Icon, Image, Item, Segment, Transition } from 'semantic-ui-react';
import { Review } from '../../../../app/models/review';
import { uk, enUS } from 'date-fns/locale'
import { useTranslation } from 'react-i18next';
import RatingStars from '../../../../app/common/rating/RatingStars';
import { useMediaQuery } from 'react-responsive';

interface Props {
    review: Review;
    avatar?: string;
}

export default function ReviewListItem({ review, avatar }: Props) {

    const { i18n } = useTranslation();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    return (
        <Transition
            duration={500}
            unmountOnhide
            transitionOnMount>
            <Segment style={{ minHeight: '9rem', width: isComputerOrTablet ? '50rem' : '100%', color: '#444', margin:'0.2rem' }}>
                <Item>
                    <Item.Content>
                        <Grid>
                            <Grid.Column width={9}>
                                <Item.Header as='h5'><Image src={review.author.avatar || avatar || '/assets/user.png'} avatar spaced='right' />{review.author.displayName}</Item.Header>
                            </Grid.Column>
                            <Grid.Column width={7} floated='right' style={{maxWidth: '10rem'}}>
                                <RatingStars rating={review.rating} />
                                {format(review.createdAt, 'dd-MMM yyyy', { locale: i18n.language == 'uk' ? uk : enUS })}
                            </Grid.Column>
                        </Grid>
                        <Item.Description>{review.reviewMessage}</Item.Description>
                    </Item.Content>
                </Item>
            </Segment>
        </Transition>
    )
}