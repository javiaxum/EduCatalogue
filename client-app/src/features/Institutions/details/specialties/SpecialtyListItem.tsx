import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Icon, Segment, Transition } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';
import { useStore } from '../../../../app/stores/store';

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
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    const buttonSize = isComputerOrTablet ? '3rem' : '3.5rem';

    return (
        <Transition
            duration={500}
            unmountOnhide
            transitionOnMount>
            <Segment basic style={{ width: isComputerOrTablet ? '16rem' : '100%', overflow: 'hidden', margin: 0, padding: '0.3rem' }}>
                <Card as={Link} to={`/specialties/${specialty.id}`} style={{ display: 'block', margin: 0, height: isComputerOrTablet ? '14rem' : '8rem', width: isComputerOrTablet ? '16rem' : '100%' }}>
                    <Card.Content>
                        <Card.Header style={{ width: isComputerOrTablet ? '11rem' : '' }}>
                            {isComputerOrTablet ? specialtyCore.name.slice(0, 50) : specialtyCore.name}{(specialtyCore.name.length > 50 && isComputerOrTablet) && "..."}
                        </Card.Header>
                        <Card.Description>{t('Specialty code') + ': '} {specialtyCore.id}</Card.Description>
                        <Card.Description>{t('ISCED code') + ': '} {iscedCodeString}</Card.Description>
                        {isComputerOrTablet && <Card.Description>{specialty.description.slice(0, 65)} {specialty.description.length > 65 && '...'}</Card.Description>}
                    </Card.Content>
                </Card>
                <Button
                    basic
                    active={isActive}
                    icon='plus'
                    className={isActive ? 'customButtonActive' : 'customButtonInactive'}
                    size='huge'
                    style={{ position: 'absolute', right: 5, margin: 0, padding: 0, bottom: isMobile ? 8 : '', top: isComputerOrTablet ? 5 : '', border: 'none', width: buttonSize, height: buttonSize, zIndex: '100', boxShadow: 'none' }}
                    type='button'
                    onClick={() => specialtyStore.toggleSelectedSpecialtyId(specialty.id)}>
                </Button>
            </Segment>
        </Transition>
    )
})