import { observer } from 'mobx-react-lite';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Segment, Transition } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { useStore } from '../../../../app/stores/store';
import { router } from '../../../routers/Routes';

export default function SpecialtyListAddNewItem() {
    const { id } = useParams();
    const { specialtyStore } = useStore();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    return (
        <Transition
            duration={500}
            transitionOnMount>
            <Segment basic style={{ width: isComputerOrTablet ? '16rem' : '100vw', height: isComputerOrTablet ? '14rem' : '8rem', overflow: 'hidden', margin: 0, padding: '0.3rem' }}>
                <Button
                    fluid
                    style={{ color: '#999', alignItems: 'center', display: 'flex', width: '100%', height: '100%' }}
                    className='specialtyCard'
                    type='button'
                    as='a'
                    onClick={() => {
                        specialtyStore.setSelectedSpecialty(new Specialty());
                        router.navigate(`/manage/${id}/createSpecialty`);
                    }}>
                    <Icon name='plus' size='large' style={{ width: '100%' }} />
                </Button>
            </Segment>
        </Transition>
    )
}