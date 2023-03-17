import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Segment } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { useStore } from '../../../../app/stores/store';
import { router } from '../../../routers/Routes';

export default function SpecialtyListAddNewItem() {
    const { id } = useParams();
    const { specialtyStore } = useStore();
    return (
        <Grid.Column style={{ width: '245px' }}>
            <Button
                fluid
                style={{ color: '#999', alignItems: 'center', display: 'flex' }}
                className='specialtyCard'
                type='button'
                as='a'
                onClick={() => {
                    specialtyStore.setSelectedSpecialty(new Specialty());
                    router.navigate(`/manage/${id}/createSpecialty`);
                }}
            >
                <Icon name='plus' size='large' style={{ width: '100%' }} />
            </Button>
        </Grid.Column>
    )
}