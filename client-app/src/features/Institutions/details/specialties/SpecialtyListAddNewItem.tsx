import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Segment } from 'semantic-ui-react';

export default function SpecialtyListAddNewItem() {
    const { id } = useParams();

    return (
        <Grid.Column style={{ width: '245px' }}>
            <Button
                fluid
                style={{ color: '#999', alignItems: 'center', display: 'flex' }}
                className='specialtyCard'
                type='button'
                as={Link}
                to={`/manage/${id}/createSpecialty`}
            >
                <Icon name='plus' size='large' style={{width: '100%'}} />
            </Button>
        </Grid.Column>
    )
}