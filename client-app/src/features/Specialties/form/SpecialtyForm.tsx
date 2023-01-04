import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import { SpecialtyFormValues } from '../../../app/models/specialty';
import { router } from '../../routers/Routes';
import CustomSelectField from './CustomSelectField';
import CustomSpecialtySelectInput from './CustomSpecialtySelectInput';
import SpecialtyDetailsComponentList from '../details/educationalComponent/SpecialtyDetailsComponentList';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { degreeOptions } from '../../../app/common/options/categoryOptions';


export default observer(function SpecialtyForm() {

    const { specialtyStore, commonStore, institutionStore } = useStore();
    const { loadSpecialtyCores, loadSpecialty, createSpecialty, editSpecialty, loading, loadingInitial, setLoadingInitial, specialtyCoresByNameAndNumber, specialtyCoreRegistry, selectedSpecialty } = specialtyStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();
    const { id1, id2 } = useParams();

    const [specialty, setSpecialty] = useState<SpecialtyFormValues>(new SpecialtyFormValues())


    const validationSchema = Yup.object({
        specialtySelect: Yup.string().required(),
        description: Yup.string().required('Specialty description is required'),
        degree: Yup.string().required(),
        ectsCredits: Yup.number().required(),
    })
    useEffect(() => {
        if (specialtyCoreRegistry.size === 0) {
            loadSpecialtyCores();
        }
        if (id2) {
            loadSpecialty(id2)
                .then(specialty => setSpecialty(new SpecialtyFormValues(specialty)));
            if (id1 === 'undefined') {
                router.navigate(`/institutions`);
            }
            // institutionStore.loadInstitution() loading institution in case form page was refreshed and institutionStore value lost
        }
        setLoadingInitial(false);
        setEditMode(true);
    }, [setLoadingInitial, loadingInitial, loadSpecialtyCores])

    function handleSpecialtyFormSubmit(specialty: SpecialtyFormValues) {
        if (id) {
            if (!specialty.id) {
                specialty.id = uuid();
                createSpecialty(specialty, id).then(() =>
                    router.navigate(`/specialties/manage/${id}`));
            } else {
                editSpecialty(specialty).then(() =>
                    router.navigate(`/specialties/manage/${id}`));
            }
        }
    }

    if (loadingInitial || loading) return (<LoadingComponent content='Loading specialties form...' />)

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={specialty}
            onSubmit={values => handleSpecialtyFormSubmit(values)}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form
                    className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'>
                    <Segment basic style={{ width: '80%', minWidth: '1000px', marginLeft: '10%' }}>
                        <Grid style={{ padding: '20px 0 0 0', color: '#444' }}>
                            <Grid.Row style={{ height: '63px' }}>
                                <Header
                                    size='large'
                                    style={{ margin: '0', height: '35px' }}
                                >
                                    Code and specialty:
                                </Header>
                                <Label style={{ margin: '0', padding: '1px', width: '30%' }}>
                                    <CustomSpecialtySelectInput
                                        options={specialtyCoresByNameAndNumber}
                                        placeholder={selectedSpecialty?.specialtyCore.name! || 'this'}
                                        name='specialtySelect'
                                        padding='0.3em' />
                                </Label>
                                <Button.Group style={{ width: '16rem', margin: '0 0 0 auto', height: '35px' }}>
                                    <Button
                                        positive
                                        type='submit'
                                        content='Submit'
                                        loading={isSubmitting}
                                        disabled={!dirty || isSubmitting || !isValid}
                                    />
                                    <Button
                                        as={Link}
                                        to={specialty.id ? `/specialties/${specialty.id}` : `/institutions/${id}`}
                                        onClick={() => setEditMode(false)}
                                        type='button'
                                        content='Cancel'
                                        disabled={isSubmitting}
                                    />
                                </Button.Group>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid style={{ width: '100%' }}>
                                    <Grid.Column width={8}>
                                        <Segment.Group style={{ boxShadow: 'none' }}>
                                            <Segment>
                                                <Label style={{ height: '26px' }}>
                                                    <Grid style={{ margin: '0' }}>
                                                        <Grid.Column style={{ width: '9rem', padding: '0' }}>
                                                            Specialty code (ISCED):
                                                        </Grid.Column>
                                                        <Grid.Column style={{ width: '3rem', padding: '0', top: '-1.5px' }}>
                                                            <CustomSelectField name='iscedCode' placeholder='iscedCode' />
                                                        </Grid.Column>
                                                    </Grid>
                                                </Label>
                                            </Segment>
                                            <Segment>
                                                <Grid>
                                                    <Grid.Column style={{ width: '7.2rem', paddingRight: '0' }}>
                                                        <Icon
                                                            name='graduation'
                                                            size='big'
                                                            color='blue' />
                                                        Degree:
                                                    </Grid.Column>
                                                    <Grid.Column style={{ width: '15rem', paddingLeft: '0' }}>
                                                        <CustomSelectInput options={degreeOptions} placeholder='Degree' name='degree' />
                                                    </Grid.Column>
                                                </Grid>
                                            </Segment>
                                            <Segment basic>
                                                <Grid>
                                                    <Grid.Column style={{ width: '10rem', paddingRight: '0' }}>
                                                        <Icon
                                                            name='clock'
                                                            size='big'
                                                            color='blue' />
                                                        ECTS credits:
                                                    </Grid.Column>
                                                    <Grid.Column style={{ width: '7rem', paddingLeft: '0', height: '56px' }}>
                                                        <CustomTextInput type='number' placeholder='ECTS credits' name='ectsCredits' padding='0.4em 0.2em 0.4em 0.2em' />
                                                    </Grid.Column>
                                                </Grid>
                                            </Segment>
                                            <Segment basic>
                                                <Grid>
                                                    <Grid.Column style={{ width: '100%', paddingRight: '0' }}>
                                                        <Icon
                                                            name='book'
                                                            size='big'
                                                            color='blue' />
                                                        Knowledge branch: {selectedSpecialty?.specialtyCore.uaBranchCode} "knowledge branch name here"
                                                    </Grid.Column>
                                                </Grid>
                                            </Segment>
                                        </Segment.Group>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Segment style={{ boxShadow: 'none', padding: '30px' }}>
                                            <Header as='h4' content='Description' dividing style={{ marginBottom: '0' }} />
                                            <CustomTextArea rows={3} placeholder='Description' name='description' />
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            <Grid.Row>
                                <Divider />
                                <Header
                                    content={`Educational components:`}
                                    size='huge'
                                    style={{ padding: '0 0 10px 0', color: '#444' }}
                                />
                            </Grid.Row>
                            <Grid.Row>
                                <SpecialtyDetailsComponentList />
                            </Grid.Row>
                        </Grid>
                    </Segment >
                </Form >
            )}
        </Formik >
    )
})
