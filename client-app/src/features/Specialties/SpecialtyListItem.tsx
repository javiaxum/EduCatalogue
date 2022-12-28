import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Item, Segment } from 'semantic-ui-react';
import { Specialty } from '../../app/models/specialty';

interface Props {
    specialty: Specialty;
}

export default function SpecialtyListItem({ specialty }: Props) {
    return (
        <Grid.Column style={{width: '245px'}}>
            <Card className='specialtyCard' style={{display: 'block'}}>
                <Card.Content>
                    <Card.Header as='a'>{specialty.specialtyCore.name}</Card.Header>
                    <Card.Description>UA specialty code: {specialty.specialtyCore.uaCode}</Card.Description>
                    <Card.Description>ISCED specialty code: {specialty.specialtyCore.iscedCode}</Card.Description>
                    <Card.Description>{specialty.description.slice(0, 50)}</Card.Description>
                </Card.Content>
                <Button as={Link} to={`/manage/${specialty.id}`} content='Details' />
            </Card>
        </Grid.Column>
    )
}