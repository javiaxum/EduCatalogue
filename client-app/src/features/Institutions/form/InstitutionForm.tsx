import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Image, Item, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import { Institution, InstitutionFormValues } from '../../../app/models/institution';
import { router } from '../../routers/Routes';
import InstitutionDetailsMenu from '../details/InstitutionDetailsMenu';
import InstitutionDetailsSpecialtiesList from '../details/specialties/InstitutionDetailsSpecialtiesList';
import InstitutionDetailsInfoForm from './InstitutionDetailsInfoForm';
import InstitutionDetailsReviewsList from '../details/reviews/InstitutionDetailsReviewsList';

export default observer(function InstitutionForm() {
    const { institutionStore, commonStore } = useStore();
    const { loadInstitution, loadingInitial, createInstitution, editInstitution, setLoadingInitial, detailsMenuActiveItem, loading, loadAllCities } = institutionStore;
    const { id } = useParams();
    const { editMode, setEditMode } = commonStore;

    const [institution, setInstitution] = useState<InstitutionFormValues>(new InstitutionFormValues())

    const validationSchema = Yup.object({
        name: Yup.string().required('Institution name is required'),
        description: Yup.string().required('Institution description is required'),
        address: Yup.string().required(),
        siteURL: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadInstitution(id)
            .then(institution => setInstitution(new InstitutionFormValues(institution)));
        else {
            setLoadingInitial(false);
        }
        loadAllCities();
        setEditMode(true);
    }, [loadInstitution, id, editMode, setLoadingInitial, setInstitution, setEditMode, loadAllCities])

    function handleInstitutionFormSubmit(institution: InstitutionFormValues) {
        if (!institution.id) {
            institution.id = uuid();
            createInstitution(institution).then(() =>
                router.navigate(`/institutions/${institution.id}`));
        } else {
            editInstitution(institution).then(() =>
                router.navigate(`/institutions/${institution.id}`));
        }
    }
    if (loadingInitial) return <LoadingComponent content='Loading institution form...' />

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={institution}
            onSubmit={values => handleInstitutionFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
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
                                                style={{ color: '#444', width: '60%', fontSize: '1rem' }}>
                                                <CustomTextInput placeholder='Name' name='name' />
                                            </Header>
                                            <Button.Group floated='right' style={{ minWidth: '10%', maxWidth: '30%' }} >
                                                <Button
                                                    positive
                                                    type='submit'
                                                    content='Submit'
                                                    loading={isSubmitting}
                                                    disabled={!dirty || isSubmitting || !isValid} />
                                                <Button
                                                    as={Link}
                                                    to={institution.id ? `/institutions/${institution.id}` : '/institutions'}
                                                    onClick={() => setEditMode(false)}
                                                    floated='right'
                                                    type='button'
                                                    content='Cancel'
                                                    disabled={isSubmitting} />
                                            </Button.Group>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column style={{ width: '70%', left: '15%', top: '-80px' }}>
                            <InstitutionDetailsMenu />
                            {detailsMenuActiveItem === 'About' &&
                                <InstitutionDetailsInfoForm />}
                            {detailsMenuActiveItem === 'Specialties' &&
                                <InstitutionDetailsSpecialtiesList />}
                            {detailsMenuActiveItem === 'Reviews' &&
                                <InstitutionDetailsReviewsList />}
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})