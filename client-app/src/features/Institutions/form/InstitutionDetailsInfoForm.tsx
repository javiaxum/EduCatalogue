import { useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, DropdownProps, Grid, Header, Icon, Image, Input, Search, Segment } from 'semantic-ui-react';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import { InstitutionFormValues } from '../../../app/models/institution';
import { Region } from '../../../app/models/region';
import { useStore } from '../../../app/stores/store';

interface Props {
    institution: InstitutionFormValues
}

export default observer(function InstitutionDetailsInfoForm({institution}: Props) {
    const { institutionStore } = useStore();
    const { regionRegistry, getRegionByCityId, setSelectedRegion, selectedRegion } = institutionStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <Grid style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='info' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Description:
                            <CustomTextArea rows={6} placeholder='Description' name='description' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='graduation' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            Student count:
                            <CustomTextInput type='number' placeholder='Student count' name='studentCount' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='marker' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            Region:
                            <CustomSelectInput
                                onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                    setSelectedRegion(regionRegistry.find((x) => x.id == data.value));
                                }}
                                placeholder={'Select region'}
                                value={selectedRegion?.id || ''}
                                name='region'
                                options={regionRegistry.map(element => ({ text: element.name, value: element.id}))
                                } />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            City:
                            <CustomSelectInput
                                placeholder={'Select city'}
                                name='cityId'
                                options={selectedRegion?.cities.map(element => ({ text: element.name, value: element.id }))
                                    .sort((a, b) => a.text.localeCompare(b.text)) || [{ text: 'Choose city', value: '' }]} />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            Address:
                            <CustomTextInput placeholder='Address' name='streetAddress' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='chain' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Homepage:
                            <CustomTextInput placeholder='SiteURL' name='siteURL' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='phone' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Contact information:
                            <CustomTextInput placeholder='Contact Information' name='contactInformation' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={6}>
                <Button style={{ position: 'absolute', opacity: '90%', height: '4rem', top: '19em', zIndex: '1000' }}>
                    <Icon name='image' style={{ padding: '0', margin: '0' }} />
                </Button>
                <Image src={'/assets/institutionTitleImagePlaceholder.png'} style={{ filter: 'brightness(50%)', height: '22em', objectFit: 'cover' }} />
            </Grid.Column>
        </Grid>
    )
})