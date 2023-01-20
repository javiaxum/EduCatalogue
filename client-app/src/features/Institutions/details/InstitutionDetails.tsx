import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Item, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { InstitutionFormValues } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoForm from '../form/InstitutionDetailsInfoForm';
import InstitutionDetailsInfo from './InstitutionDetailsInfo';
import InstitutionDetailsMenu from './InstitutionDetailsMenu';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

export default observer(function InstitutionDetails() {
    const { institutionStore, commonStore } = useStore();
    const {
        selectedInstitution: institution,
        loadingInitial,
        loadInstitution,
        detailsMenuActiveItem,
        loading
    } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadInstitution(id);
        setEditMode(false);
    }, [loadInstitution, id]);


    if (loadingInitial || loading) return <LoadingComponent />
    if (!institution) return (<></>);

    return (
        <Grid>
            <Grid.Column width={16} style={{ padding: '1rem 0 1rem 0' }}>
                <Segment style={{ top: '-1px', padding: '0' }} basic clearing>
                    <Image src={'/assets/YFCNU.jpg'} fluid style={{ filter: 'brightness(50%)', height: '16em', objectFit: 'cover' }} />
                </Segment>
                <Segment style={{
                    padding: '1em 3em 1em 3em',
                    top: '-4em',
                    left: '5%',
                    width: '90%',
                    height: 'auto',
                    color: 'white',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    border: 'none',
                    minWidth: '1000px'
                }}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={institution.name}
                                    style={{ color: '#444' }}
                                />
                                <Button
                                    onClick={() => setEditMode(!editMode)}
                                    as={Link}
                                    to={`/manage/${institution.id}`}
                                    floated='right'
                                    style={{ width: '12rem' }}
                                    content={'Manage Institution'}
                                />
                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content>
                                <InstitutionDetailsMenu />
                                {detailsMenuActiveItem === 'About' &&
                                    <InstitutionDetailsInfo institution={institution} />}
                                {detailsMenuActiveItem === 'Specialties' &&
                                    <InstitutionDetailsSpecialtiesList />}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})