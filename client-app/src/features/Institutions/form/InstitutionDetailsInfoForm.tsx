import React from 'react';
import { Button, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomTextInput from '../../../app/common/form/CustomTextInput';

export default function InstitutionDetailsInfoForm() {
    return (
        <Grid>
            <Grid.Column width={10}>
                <Grid divided style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='info' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <CustomTextArea rows={6} placeholder='Description' name='description' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='marker' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Address:
                            <CustomTextInput placeholder='Address' name='address' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Homepage:
                            <CustomTextInput placeholder='SiteURL' name='siteURL' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={6}>
                <Image src={'/assets/institutionTitleImagePlaceholder.png'} style={{ filter: 'brightness(50%)', height: '22em', objectFit: 'cover' }} />
            </Grid.Column>
        </Grid>
    )
}
