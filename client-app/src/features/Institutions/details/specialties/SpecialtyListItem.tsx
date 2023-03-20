import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';
import { useStore } from '../../../../app/stores/store';

interface Props {
    specialty: Specialty;
    specialtyCore: SpecialtyCore;
    iscedCodeString: string;
}

export default observer(function SpecialtyListItem({ specialty, specialtyCore, iscedCodeString }: Props) {

    const { specialtyStore } = useStore();
    const { t  } = useTranslation();
    const isActive = specialtyStore.selectedSpecialtyIds.includes(specialty.id);

    return (
        <Grid.Column style={{ width: '245px', overflow: 'hidden' }}>
            <Card as={Link} to={`/specialties/${specialty.id}`} className='specialtyCard' style={{ display: 'block' }}>
                <Card.Content>
                    <Card.Header style={{width: '180px'}}>{specialtyCore.name.slice(0, 40)} {specialtyCore.name.length > 50 && '...'}</Card.Header>
                    <Card.Description>{t('Specialty code') + ': '} {specialtyCore.id}</Card.Description>
                    <Card.Description>{t('ISCED code') + ': '} {iscedCodeString}</Card.Description>
                    <Card.Description>{specialty.description.slice(0, 80)} {specialty.description.length > 80 && '...'}</Card.Description>
                </Card.Content>
            </Card>
            <Button
                basic
                active={isActive}
                className={isActive ? 'customButtonActive' : 'customButtonInactive'}
                style={{ position: 'absolute', right: 15, margin: 0, padding: 0, top: 15, border: 'none', width: '2rem', height: '2rem', zIndex: '1000', boxShadow: 'none' }}
                onClick={() => specialtyStore.toggleSelectedSpecialtyId(specialty.id)}>
                <Icon name='plus' size='large' style={{ left: '0.45rem', bottom: '0.05rem', position: 'relative' }} />
            </Button>
        </Grid.Column>
    )
})