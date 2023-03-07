import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Item, Segment } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import { Specialty } from '../../../../app/models/specialty';

interface Props {
    component: EducationalComponent;
}

export default function ComponentListItem({ component }: Props) {

    const { t, i18n } = useTranslation();

    return (
        <Grid.Column style={{ width: '250px' }}>
            <Card className='componentCard' style={{ display: 'flex' }}>
                <Card.Content style={{ padding: '1rem 1rem 0 1rem' }} >
                    <Card.Header as='a' style={{ paddingTop: 'auto', paddingBottom: 'auto' }}>{component.name}</Card.Header>
                </Card.Content>
                <Card.Meta content={t('ECTS credits') + ": " + component.ectsCredits} style={{ padding: '0.3rem 0 1rem 1rem' }} />
            </Card>
        </Grid.Column>
    )
}