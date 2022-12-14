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
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';

export default observer(function InstitutionForm() {

    const { institutionStore } = useStore();
    const { loading, loadInstitution, loadingInitial, createInstitution, editInstitution, setLoadingInitial } = institutionStore;
    const { id } = useParams();

    const [specialty, setSpecialty] = useState({
        id: '',
        name: '',
        description: '',
        degree: '',
        estcCredits: '',
        duration: ''
    });

    const validationSchema = Yup.object({
        description: Yup.string().required('Specialty description is required'),
        degree: Yup.string().required(),
        ectsCredits: Yup.string().required(),
        duration: Yup.string().required(),
    })

    useEffect(() => {
        // if (id) loadInstitution(id).then(institution => setInstitution(institution!));
        /*else*/ setLoadingInitial(false);
    }, [loadInstitution, id, setLoadingInitial])

    if (loadingInitial) return <LoadingComponent content='Loading institution form...' />

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={specialty} onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <CustomSelectInput options={categoryOptions} placeholder='Specialty' name='specialty' />
                        <CustomTextArea rows={3} placeholder='Description' name='description' />
                        <CustomTextInput placeholder='Degree' name='degree' />
                        <CustomTextInput placeholder='ECTS credits' name='ectsCredits' />
                        <CustomTextInput placeholder='Duration' name='duration' />
                        <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                        <Button as={Link} to='/Institutions' floated='right' type='button' content='Cancel' disabled={loading} />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})