import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Image, Placeholder, Segment } from 'semantic-ui-react';
import { Institution, InstitutionFormValues } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

export default observer(function InstitutionDetailsInfoPlaceholder() {

    const { institutionStore, commonStore } = useStore();
    const {
        loadingInitial,
        loadInstitution,
        detailsMenuActiveItem,
        regionRegistry,
        selectedInstitution } = institutionStore;

    if (!selectedInstitution || !regionRegistry) return <></>

    // const institutionRegion = regionRegistry.find((x) => x.cities.find((x) => x.id.toLocaleLowerCase() == institution.cityId.toLocaleLowerCase()));
    // add region name to the institution details info
    return (
        <>
            <Grid>
                <Grid.Column width={10}>
                    <Grid style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon size='large' color='blue' name='info' />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                Description:
                                <Placeholder fluid>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon size='large' color='blue' name='graduation' />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                Student count:
                                <Placeholder fluid>
                                    <Placeholder.Line />
                                </Placeholder>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name='marker' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                City:
                                <Placeholder fluid>
                                    <Placeholder.Line />
                                </Placeholder>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Icon name='home' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                Address:
                                <Placeholder fluid>
                                    <Placeholder.Line />
                                </Placeholder>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name='chain' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                Homepage:
                                <Placeholder fluid>
                                    <Placeholder.Line />
                                </Placeholder>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name='phone' size='large' color='blue' />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                Contact information:
                                <Placeholder fluid>
                                    <Placeholder.Line />
                                </Placeholder>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Placeholder fluid>
                        <Placeholder.Image style={{ objectFit: 'cover', minHeight: '22rem', minWidth: '22rem', borderRadius: '30px' }} />
                    </Placeholder>
                </Grid.Column>
            </Grid>
        </>
    )
})