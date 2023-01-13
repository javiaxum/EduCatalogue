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
            <Card className='specialtyCard' style={{ display: 'block' }}>
                <Card.Content>
                    <Card.Header as='a'>{specialtyCore.name}</Card.Header>
                    <Card.Description>UA specialty code: {specialtyCore.id}</Card.Description>
                    <Card.Description>ISCED specialty code: {iscedCodeString}</Card.Description>
                    <Card.Description>{specialty.description.slice(0, 50)}</Card.Description>
                </Card.Content>
                <Button as={Link} to={`/specialties/${specialty.id}`} content='Details' />
            </Card>
        </Grid.Column>
    )
}