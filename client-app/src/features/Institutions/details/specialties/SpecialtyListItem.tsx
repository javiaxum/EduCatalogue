import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';

interface Props {
    specialty: Specialty;
    specialtyCore: SpecialtyCore;
    iscedCodeString: string;
}

export default function SpecialtyListItem({ specialty, specialtyCore, iscedCodeString }: Props) {

    return (
        <Grid.Column style={{ width: '245px' }}>
            <Card as={Link} to={`/specialties/${specialty.id}`} className='specialtyCard' style={{ display: 'block' }}>
                <Card.Content>
                    <Card.Header>{specialtyCore.name.slice(0, 50)} {specialtyCore.name.length > 50 && '...'}</Card.Header>
                    <Card.Description>UA specialty code: {specialtyCore.id}</Card.Description>
                    <Card.Description>ISCED specialty code: {iscedCodeString}</Card.Description>
                    <Card.Description>{specialty.description.slice(0, 80)} {specialty.description.length > 80 && '...'}</Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}