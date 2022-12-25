import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Item, Segment } from 'semantic-ui-react';
import { Specialty } from '../../app/models/specialty';

interface Props {
    specialty: Specialty;
}

export default function SpecialtyListItem({ specialty }: Props) {
    return (
        <Grid.Column width={4}>
            <Card>
                <Card.Content>
                    <Card.Header as='a'>{specialty.specialtyCore.name}</Card.Header>
                    <Card.Content style={{ color: '#444' }}>UA specialty code: {specialty.specialtyCore.uaCode}</Card.Content>
                    <Card.Content style={{ color: '#444' }}>ISCED specialty code: {specialty.specialtyCore.iscedCode}</Card.Content>
                    <Card.Description style={{ color: '#444' }}>{specialty.description.slice(0, 50)}</Card.Description>
                </Card.Content>
                <Button as={Link} to={`/specialties/${specialty.id}`} floated='right' content='Details' />
            </Card>
        </Grid.Column>
    )
}