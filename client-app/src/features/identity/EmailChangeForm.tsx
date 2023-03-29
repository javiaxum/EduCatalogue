import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Dimmer, Header, Label, Segment } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    return (
        <Formik
            initialValues={{ email: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .requestEmailChange(values.email) // toast popup with successful email sent.
                    .catch(error => setErrors({ error: 'Invalid email' })).finally(() => modalStore.closeModal())
            }>
            {({ handleSubmit, isSubmitting, errors, getFieldProps, getFieldHelpers }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Change email')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.3rem' width='100%' placeholder={t('New email')} name='email' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: '1em', textAlign: 'left !important' }} basic color='red' content={errors.error} />} />
                    <Button.Group fluid>
                        <Button positive content={t('Submit change request')} type='submit' loading={isSubmitting} />
                        <Button content={t('Cancel')} type='button' onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})