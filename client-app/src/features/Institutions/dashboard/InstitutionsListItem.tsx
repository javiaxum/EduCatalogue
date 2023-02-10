import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Item, Image, Header, Icon, Container } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

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

    const { institutionStore } = useStore();

    return (
        <Item style={{ minHeight: 110, paddingTop: 10 }}>
            <Grid>
                <Grid.Column style={{ width: '13rem', minWidth: '13rem' }}>
                    <Image
                        src={institution.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                        style={{ objectFit: 'cover', minHeight: '12rem', minWidth: '12rem', height: '12rem', width: '12rem', borderRadius: '30px' }} />
                </Grid.Column>
                <Grid.Column style={{ width: 'calc(100% - 14rem)' }}>
                    <Grid style={{ width: '100%', padding: '0 0 0 5%' }}>
                        <Grid.Row >
                            <Header as={Link} to={`/institutions/${institution.id}`}>{institution.name}</Header>
                        </Grid.Row>
                        <Grid.Row style={{padding: '0 0 1rem 0'}} >
                            {elements}
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column style={{ width: '100%' }}>
                    <Item.Description>{institution.description.slice(0, 250) + " ..."}</Item.Description>
                    <Item.Meta>{institutionStore.getCityById(institution.cityId, institution.regionId)?.name}, {institution.streetAddress}</Item.Meta>
                </Grid.Column>
            </Grid>
        </Item>
    )
}