import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import { Institution } from '../../../app/models/institution';
import { router } from '../../routers/Routes';

export default observer(function InstitutionForm() {
    const { institutionStore } = useStore();
    const { loading, loadInstitution, loadingInitial, createInstitution, editInstitution, setLoadingInitial } = institutionStore;
    const { id } = useParams();

    const [institution, setInstitution] = useState({
        id: '',
        name: '',
        description: '',
        address: '',
        siteURL: '',
        titleImage: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('Institution name is required'),
        description: Yup.string().required('Institution description is required'),
        address: Yup.string().required(),
        siteURL: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadInstitution(id).then(institution => setInstitution(institution!));
        else setLoadingInitial(false);
    }, [loadInstitution, id, setLoadingInitial])

    function handleInstitutionFormSubmit(i: Institution) {
        if (i.id.length === 0) {
            let newInstitution = {
                ...i,
                id: uuid()
            }
            createInstitution(i).then(() => router.navigate(`/institutions/${newInstitution.id}`));
        } else {
            editInstitution(i).then(() => router.navigate(`/institutions/${i.id}`));
        }
    }
    if (loadingInitial) return <LoadingComponent content='Loading institution form...' />

    return (
        <Segment clearing style={{ borderRadius: '0px 0px 10px 10px' }}>
            <Header sub content='Institution details' color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={institution} onSubmit={values => handleInstitutionFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <CustomTextInput placeholder='Name' name='name' />
                        <CustomTextArea rows={3} placeholder='Description' name='description' />
                        <CustomTextInput placeholder='Address' name='address' />
                        <CustomTextInput placeholder='SiteURL' name='siteURL' />
                        <Button
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                            loading={loading}
                            disabled={!dirty || isSubmitting || !isValid}
                        />
                        <Button
                            as={Link}
                            to='/Institutions'
                            floated='right'
                            type='button'
                            content='Cancel'
                            disabled={loading}
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})