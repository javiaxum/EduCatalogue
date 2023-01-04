import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Item, Segment } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import { Specialty } from '../../../../app/models/specialty';

interface Props {
    component: EducationalComponent;
}

export default function ComponentListItem({ component }: Props) {
    return (
        <Grid.Column style={{width: '245px'}}>
            <Card className='specialtyCard' style={{display: 'block'}}>
                <Card.Content>
                    <Card.Header as='a'>{component.name}</Card.Header>
                    <Card.Description>Description: {component.description.slice(0, 50)}</Card.Description>
                </Card.Content>
                {/* <Button as={Link} to={`/specialties/${specialty.id}`} content='Details' /> */}
            </Card>
        </Grid.Column>
    )
}