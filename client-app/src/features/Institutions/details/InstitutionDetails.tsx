import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Item, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Institution, InstitutionFormValues } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoForm from '../form/InstitutionDetailsInfoForm';
import InstitutionDetailsInfo from './InstitutionDetailsInfo';
import InstitutionDetailsMenu from './InstitutionDetailsMenu';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import InstitutionDetailsReviewsList from './reviews/InstitutionDetailsReviewsList';

export default observer(function InstitutionDetails() {
    const { institutionStore, commonStore } = useStore();
    const {
        loadingInitial,
        loadInstitution,
        detailsMenuActiveItem,
        loading,
        selectedInstitution } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();
    // const [institution, setInstitution] = useState<Institution>(new Institution());

    useEffect(() => {
        if (id) loadInstitution(id);
        // .then((institution) => setInstitution(new Institution(institution)));
        setEditMode(false);
    }, [loadInstitution, id]);


    if (loadingInitial || loading) return <LoadingComponent />
    if (!selectedInstitution) return (<></>);

    return (
        <Grid>
            <Grid.Column width={16} style={{ padding: '1rem 0 1rem 0' }}>
                <Segment style={{ top: '-1px', padding: '0' }} basic clearing>
                    <Image src={'/assets/YFCNU.jpg'} fluid style={{ filter: 'brightness(50%)', height: '16em', objectFit: 'cover' }} />
                </Segment>
                <Segment style={{
                    padding: '1em 3em 1em 3em',
                    top: '-4em',
                    left: '15%',
                    width: '70%',
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
                                    content={selectedInstitution.name}
                                    style={{ color: '#444' }}
                                />
                                <Button
                                    onClick={() => setEditMode(!editMode)}
                                    as={Link}
                                    to={`/manage/${selectedInstitution.id}`}
                                    floated='right'
                                    style={{ width: '12rem' }}
                                    content={'Manage Institution'}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
            <Grid.Column style={{ width: '70%', left: '15%', top: '-80px' }}>
                <InstitutionDetailsMenu />
                {detailsMenuActiveItem === 'About' &&
                    <InstitutionDetailsInfo institution={selectedInstitution} />}
                {detailsMenuActiveItem === 'Specialties' &&
                    <InstitutionDetailsSpecialtiesList />}
                {/* {detailsMenuActiveItem === 'Reviews' && selectedInstitution.reviews &&
                    <InstitutionDetailsReviewsList />} */}
            </Grid.Column>
        </Grid>
    )
})