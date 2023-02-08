import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Item, Image, Header, Icon } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

interface Props {
    institution: Institution
}

export default function InstitutionsListItem({ institution }: Props) {
    let elements = [];
    for (let i = 1; i <= Math.floor(institution.rating); i++) {
        elements.push((<Icon color='yellow' name='star' key={i} />))
    }
    for (let i = 1; i <= 5 - Math.floor(institution.rating); i++) {
        elements.push((<Icon color='yellow' name='star outline' key={5 - i + 1} />))
    }


    return (
        <Item style={{ minHeight: 110, paddingTop: 10 }}>
            <Grid>
                <Grid.Column style={{ width: '25%' }}>
                    <Image
                        src={institution.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                        style={{ objectFit: 'cover', minHeight: '12rem', minWidth: '12rem', height: '12rem', width: '12rem', borderRadius: '30px' }} />
                </Grid.Column>
                <Grid.Column style={{ width: '55%' }}>
                    <Header as={Link} to={`/institutions/${institution.id}`}>{institution.name}</Header>
                </Grid.Column>
                <Grid.Column style={{ width: '20%' }}>
                    {elements}
                </Grid.Column>
                <Grid.Column style={{ width: '100%' }}>
                    <Item.Description>{institution.description.slice(0, 250) + " ..."}</Item.Description>
                    <Item.Meta>{institution.cityName}, {institution.streetAddress}</Item.Meta>
                </Grid.Column>
            </Grid>
        </Item>
    )
}