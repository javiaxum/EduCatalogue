import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SpecialtyDetailsComponentList from './educationalComponent/SpecialtyDetailsComponentList';

export default observer(function SpecialtyDetails() {
    const { specialtyStore, commonStore, institutionStore } = useStore()
    const { selectedSpecialty, loadSpecialty, loadingInitial, getSpecialtyCore, getBranch, getSpecialtyCoreISCEDString, loading } = specialtyStore;
    const { } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadSpecialty(id).then();
        setEditMode(false);
    }, [loadSpecialty, selectedSpecialty, id]);

    if (loadingInitial || loading) return <LoadingComponent />
    if (!selectedSpecialty) return <></>;

    return (
        <Segment basic style={{ width: '80%', minWidth: '1000px', marginLeft: '10%' }}>
            <Grid style={{ padding: '20px 0 0 0', color: '#444' }}>
                <Grid.Row>
                    <Header
                        size='large'
                        style={{ margin: '0', height: '35px' }}
                    >
                        Code and specialty:<Label
                            size='big'
                            content={`${selectedSpecialty.localSpecialtyCode} ${getSpecialtyCore(selectedSpecialty.localSpecialtyCode!)?.name}`}
                            style={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }} />
                    </Header>
                    <Button
                        onClick={() => commonStore.setEditMode(false)}
                        as={Link}
                        to={`/institutions/${institutionStore.selectedInstitution?.id}`}
                        style={{ width: '16rem', marginLeft: 'auto', height: '2.5rem' }}
                        content={'To institution'}
                    />
                    <Button
                        onClick={() => commonStore.setEditMode(!commonStore.editMode)}
                        as={Link}
                        to={`/manage/${institutionStore.selectedInstitution?.id}/specialty/${selectedSpecialty.id}`}
                        style={{ width: '16rem', marginLeft: '0', height: '2.5rem' }}
                        content={'Manage Specialty'}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Grid style={{ width: '100%' }}>
                        <Grid.Column width={6}>
                            <Segment.Group style={{ boxShadow: 'none' }}>
                                <Segment>
                                    <Label
                                        content={`Specialty code (ISCED): ${getSpecialtyCoreISCEDString(selectedSpecialty.localSpecialtyCode)}`}
                                    />
                                </Segment>
                                <Segment>
                                    <Icon
                                        name='graduation'
                                        size='big'
                                        color='blue' />
                                    Degree: {selectedSpecialty.degree}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='clock'
                                        size='big'
                                        color='blue' />
                                    ECTS credits: {selectedSpecialty.ectsCredits} credits
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='book'
                                        size='big'
                                        color='blue' />
                                    Knowledge branch: {selectedSpecialty.localSpecialtyCode.slice(0, 2)} {getBranch(selectedSpecialty.localSpecialtyCode.slice(0, 2))?.name}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='dollar'
                                        size='big'
                                        color='blue' />
                                    Full price: {selectedSpecialty.priceUAH} UAH
                                    {selectedSpecialty.nonPaidEducationAvailable && <Label content='Non paid education is available' />}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='flag'
                                        size='big'
                                        color='blue' />
                                    Start year: {selectedSpecialty.startYear} End year: {selectedSpecialty.endYear}
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                        <Grid.Column width={8} stretched>
                            <Segment style={{ boxShadow: 'none', padding: '30px' }}>
                                <Header as='h4' content='Description' dividing />
                                <Segment basic style={{ padding: '0 0 0 10px' }}>
                                    {selectedSpecialty.description}
                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Divider />
                    <Header
                        content={`Educational components:`}
                        size='huge'
                        style={{ padding: '0 0 10px 0', color: '#444' }} />
                </Grid.Row>
                <Grid.Row>
                    <SpecialtyDetailsComponentList />
                </Grid.Row>
            </Grid>
        </Segment >
    )
})