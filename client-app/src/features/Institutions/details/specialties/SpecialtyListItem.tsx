import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Icon, Segment, Transition } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';
import { useStore } from '../../../../app/stores/store';
import ConfirmDeleteSpecialty from './ConfirmDeleteSpecialty';

interface Props {
    specialty: Specialty;
    specialtyCore: SpecialtyCore;
    iscedCodeString: string;
}

export default observer(function SpecialtyListItem({ specialty, specialtyCore, iscedCodeString }: Props) {

    const { specialtyStore, commonStore: { editMode }, modalStore } = useStore();
    const { t } = useTranslation();
    const isActive = specialtyStore.selectedSpecialtyIds.includes(specialty.id);
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    return (
        <Transition
            duration={500}
            unmountOnhide
            transitionOnMount>
            <Segment basic style={{ width: isComputerOrTablet ? '16rem' : '13rem', overflow: 'hidden', margin: 0, padding: '0.3rem' }}>
                <Card as={Link} to={`/specialties/${specialty.id}`} style={{ display: 'block', margin: 0, height: isComputerOrTablet ? '14rem' : '12rem' }}>
                    <Card.Content>
                        <Card.Header style={{ width: isComputerOrTablet ? '12rem' : '10rem' }}>{specialtyCore.name.slice(0, 35)}{specialtyCore.name.length > 35 && '...'}</Card.Header>
                        <Card.Description>{t('Specialty code') + ': '} {specialtyCore.id}</Card.Description>
                        <Card.Description>{t('ISCED code') + ': '} {iscedCodeString}</Card.Description>
                        {isComputerOrTablet && <Card.Description>{specialty.description.slice(0, 65)} {specialty.description.length > 65 && '...'}</Card.Description>}
                    </Card.Content>
                </Card>
                {editMode ?
                    <Button
                        basic
                        style={{ position: 'absolute', right: 5, margin: 0, padding: 0, top: 5, border: 'none', width: '2rem', height: '2rem', zIndex: '100', boxShadow: 'none' }}
                        type='button'
                        onClick={() => modalStore.openModalMini(<ConfirmDeleteSpecialty id={specialty.id} />)}>
                        <Icon name='trash' size='large' style={{ left: '0.45rem', bottom: '0.05rem', position: 'relative' }} />
                    </Button> :
                    <Button
                        basic
                        active={isActive}
                        className={isActive ? 'customButtonActive' : 'customButtonInactive'}
                        style={{ position: 'absolute', right: 5, margin: 0, padding: 0, top: 5, border: 'none', width: '2rem', height: '2rem', zIndex: '100', boxShadow: 'none' }}
                        type='button'
                        onClick={() => specialtyStore.toggleSelectedSpecialtyId(specialty.id)}>
                        <Icon name='plus' size='large' style={{ left: '0.45rem', bottom: '0.05rem', position: 'relative' }} />
                    </Button>}
            </Segment>
        </Transition>
    )
})