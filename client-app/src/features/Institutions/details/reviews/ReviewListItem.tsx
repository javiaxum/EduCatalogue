import { format } from 'date-fns';
import { Grid, Icon, Image, Item } from 'semantic-ui-react';
import { Review } from '../../../../app/models/review';
import { uk, enUS } from 'date-fns/locale'
import { useTranslation } from 'react-i18next';

interface Props {
    review: Review;
}

export default function ReviewListItem({ review }: Props) {

    const {t, i18n} = useTranslation();

    let elements = [];
    for (let i = 1; i <= review.rating; i++) {
        elements.push((<Icon color='yellow' name='star' key={i} />))
    }
    for (let i = 1; i <= 5 - review.rating; i++) {
        elements.push((<Icon color='yellow' name='star outline' key={5 - i + 1} />))
    }
    return (
        <Item style={{ minHeight: '90px', minWidth: '600px', color: '#444' }}>
            <Item.Content>
                <Grid>
                    <Grid.Column style={{ minWidth: '200px' }}>
                        <Item.Header as='h5'><Image src={review.author.avatar || '/assets/user.png'} avatar spaced='right' />{review.author.displayName}</Item.Header>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {elements}
                    </Grid.Column>
                    <Grid.Column width={3}>
                        {format(review.createdAt, 'dd-MMM yyyy', { locale: i18n.language == 'ua' ? uk : enUS })}
                    </Grid.Column>
                </Grid>
                <Item.Description>{review.reviewMessage}</Item.Description>
            </Item.Content>
        </Item >
    )
}