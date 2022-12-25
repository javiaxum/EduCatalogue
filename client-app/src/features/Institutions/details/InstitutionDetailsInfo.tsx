import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

interface Props {
    institution: Institution;
}

export default function InstitutionDetailsInfo({ institution }: Props) {
    return (
        <>
            <Grid style={{ color: '#444', padding: '0', width: '70%' }} divided verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Icon size='large' color='blue' name='info' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>{institution.description}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='blue' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        Address:
                        <span>  {institution.address}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Icon name='home' size='large' color='blue' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        Homepage:
                        <a href={`https://${institution.siteURL}`} target="_blank">  {institution.siteURL}</a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Image src={'/assets/institutionTitleImagePlaceholder.png'} style={{ filter: 'brightness(50%)', height: '22em', objectFit: 'cover' }}/>
        </>
    )
}