import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { Institution, InstitutionFormValues } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoPlaceholder from './InstitutionDetailsInfoPlaceholder';

export default observer(function InstitutionDetailsInfo() {

    const { institutionStore, commonStore } = useStore();
    const {
        loadingInitial,
        loadInstitution,
        getCityById,
        detailsMenuActiveItem,
        regionRegistry,
        selectedInstitution, loading } = institutionStore;

    if (!selectedInstitution || !regionRegistry) return <></>

    // const institutionRegion = regionRegistry.find((x) => x.cities.find((x) => x.id.toLocaleLowerCase() == institution.cityId.toLocaleLowerCase()));
    // add region name to the institution details info
    return (
        <>
            {loading
                ? <InstitutionDetailsInfoPlaceholder />
                : <Grid>
                    <Grid.Column width={10}>
                        <Grid style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <Icon size='large' color='blue' name='info' />
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    Description:
                                    <p>{selectedInstitution.description}</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <Icon size='large' color='blue' name='graduation' />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    Student count:
                                    {selectedInstitution.studentCount}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <Icon name='marker' size='large' color='blue' />
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    City:
                                    {getCityById(selectedInstitution.cityId, selectedInstitution.regionId)?.name}
                                </Grid.Column>
                                <Grid.Column width={1}>
                                    <Icon name='home' size='large' color='blue' />
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    Address:
                                    {selectedInstitution.streetAddress}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <Icon name='chain' size='large' color='blue' />
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    Homepage:
                                    <a href={`https://${selectedInstitution.siteURL}`} target="_blank">  {selectedInstitution.siteURL}</a>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <Icon name='phone' size='large' color='blue' />
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    Contact information:
                                    {selectedInstitution.contactInformation}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Image
                            avatar
                            src={selectedInstitution.images.find((x) => x.id === selectedInstitution.titleImageId)?.url || '/assets/institutionTitleImagePlaceholder.png'}
                            style={{ objectFit: 'cover', minHeight: '22rem', minWidth: '22rem', borderRadius: '30px' }} />
                    </Grid.Column>
                </Grid>}
        </>
    )
})