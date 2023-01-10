import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Item, Segment } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';

interface Props {
    specialty: Specialty;
    specialtyCore: SpecialtyCore;
}

export default function SpecialtyListItem({ specialty, specialtyCore }: Props) {
    return (
        <Grid.Column style={{width: '245px'}}>
            <Card className='specialtyCard' style={{display: 'block'}}>
                <Card.Content>
                    <Card.Header as='a'>{specialtyCore.localSpecialtyName}</Card.Header>
                    <Card.Description>UA specialty code: {specialtyCore.localSpecialtyCode}</Card.Description>
                    <Card.Description>ISCED specialty code: {specialtyCore.iscedSpecialtyCode}</Card.Description>
                    <Card.Description>{specialty.description.slice(0, 50)}</Card.Description>
                </Card.Content>
                <Button as={Link} to={`/specialties/${specialty.id}`} content='Details' />
            </Card>
        </Grid.Column>
    )
}