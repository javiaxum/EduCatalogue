import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Grid, Icon, Image, Item } from 'semantic-ui-react';
import { Review } from '../../../../app/models/review';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';

interface Props {
    review: Review;
}

export default function ReviewListItem({ review }: Props) {

    let elements = [];
    for (let i = 1; i <= review.rating; i++) {
        elements.push((<Icon color='yellow' name='star' />))
    }
    for (let i = 1; i <= 5 - review.rating; i++) {
        elements.push((<Icon color='yellow' name='star outline' />))
    }
    return (
        <Item style={{ minHeight: '90px', width: '700px', color: '#444' }}>
            <Item.Content>
                <Grid>
                    <Grid.Column style={{minWidth: '200px'}}>
                        <Item.Header as='h5'><Image src={review.author.image || '/assets/user.png'} avatar spaced='right' />{review.author.displayName}</Item.Header>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        {elements}
                    </Grid.Column>
                    <Grid.Column width={3} floated='right'>
                        {format(review.createdAt, 'dd-MMM yyyy')}
                    </Grid.Column>
                </Grid>
                <Item.Description>{review.reviewMessage}</Item.Description>
            </Item.Content>
        </Item >
    )
}