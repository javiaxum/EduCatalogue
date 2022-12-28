import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
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


export default observer(function SpecialtyForm() {

    const { specialtyStore } = useStore();
    const { loadSpecialtyCores, loadSpecialty, createSpecialty, editSpecialty, loading, loadingInitial, setLoadingInitial, specialtyCoresByNameAndNumber, specialtyCoreRegistry } = specialtyStore;
    const { id } = useParams();
    const { id1, id2 } = useParams();

    const [specialty, setSpecialty] = useState<SpecialtyFormValues>(new SpecialtyFormValues())


    const validationSchema = Yup.object({
        description: Yup.string().required('Specialty description is required'),
        degree: Yup.string().required(),
        ectsCredits: Yup.number().required(),
    })
    useEffect(() => {
        if (specialtyCoreRegistry.size < 2) {
            loadSpecialtyCores().then(() => { setLoadingInitial(false) })
        }
        if (id1 && id2) {
            loadSpecialty(id2)
                .then(specialty => setSpecialty(new SpecialtyFormValues(specialty)));
        } else {
            setLoadingInitial(false);
        }
    },
        [setLoadingInitial, loadingInitial, loadSpecialtyCores])

    function handleSpecialtyFormSubmit(specialty: SpecialtyFormValues) {
        if (id) {
            if (!specialty.id) {
                specialty.id = uuid();
                createSpecialty(specialty, id).then(() =>
                    router.navigate(`/manage/${id}`));
            } else {
                editSpecialty(specialty).then(() =>
                    router.navigate(`/manage/${id}`));
            }
        }
    }

    if (loadingInitial) return (<LoadingComponent content='Loading specialties form...' />)

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={specialty}
                onSubmit={values => console.log(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form
                        className='ui form'
                        onSubmit={handleSubmit}
                        autoComplete='off'>
                        <CustomSpecialtySelectInput
                            options={specialtyCoresByNameAndNumber}
                            placeholder='Specialty'
                            name='specialtySelect' />
                        <CustomSelectField name='uaCode' placeholder='uaCode' />
                        <CustomSelectField name='iscedCode' placeholder='iscedCode' />
                        <CustomTextArea rows={3} placeholder='Description' name='description' />
                        <CustomTextInput placeholder='Degree' name='degree' />
                        <CustomTextInput type='number' placeholder='ECTS credits' name='ectsCredits' />
                        <Button
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                            loading={isSubmitting}
                            disabled={!dirty || isSubmitting || !isValid} />
                        <Button
                            as={Link}
                            to={`/institutions/${id}`}
                            floated='right'
                            type='button'
                            content='Cancel'
                            disabled={loading} />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})