import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

interface Props {
    institution: Institution;
}

export default function InstitutionComparisonItem({institution}: Props) {
    return (
        <Grid.Column style={{width: '300px'}}>
            <Segment.Group>
                <Segment>
                    <Header>{institution.name}</Header>
                </Segment>
                <Segment>
                    <Header>{institution.accreditation}</Header>
                </Segment>
                <Segment>
                    <Header>{institution.rating}</Header>
                </Segment>
                <Segment>
                    <Header>{institution.specialties?.length}</Header>
                </Segment>
                <Segment>
                    <Header>{institution.studentCount}</Header>
                </Segment>
            </Segment.Group>
        </Grid.Column>
    )
}