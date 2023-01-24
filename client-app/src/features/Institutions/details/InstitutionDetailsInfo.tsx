import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { Institution, InstitutionFormValues } from '../../../app/models/institution';

interface Props {
    institution: Institution;
}

export default function InstitutionDetailsInfo({ institution }: Props) {
    return (
        <>
            <Grid>
                <Grid.Column width={10}>
                    <Grid divided style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon size='large' color='blue' name='info' />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                Description:
                                <p>{institution.description}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon size='large' color='blue' name='graduation' />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                Student count:
                                {institution.studentCount}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name='marker' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                City:
                                {institution.city}
                            </Grid.Column>
                            <Grid.Column width={7}>
                                Address:
                                {institution.streetAddress}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name='home' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                Homepage:
                                <a href={`https://${institution.siteURL}`} target="_blank">  {institution.siteURL}</a>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name='phone' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                Contact information:
                                {institution.contactInformation}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                        <Image src={'/assets/institutionTitleImagePlaceholder.png'} style={{ filter: 'brightness(50%)', height: '22em', objectFit: 'cover' }} />
                </Grid.Column>
            </Grid>
        </>
    )
}