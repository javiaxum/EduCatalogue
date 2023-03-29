import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Dimmer, Header, Label, Segment } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import PasswordResetRequestForm from './PasswordResetRequestForm';

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    return (

        <Formik
            initialValues={{ email: '', password: '', error: null, rememberMeSwitch: false }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .login(values)
                    .catch(error => setErrors({ error: 'Invalid email or password' }))
            } >
            {({ handleSubmit, isSubmitting, errors, getFieldProps, getFieldHelpers }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Login')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.3rem' width='100%' placeholder='Email' name='email' />
                    <CustomTextInput margin='0.3rem' width='100%' placeholder={t('Password')} name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: '1em', textAlign: 'left !important' }} basic color='red' content={errors.error} />} />
                    <Checkbox
                        label={t('Remember me')}
                        style={{ padding: '0 0 1rem 0' }}
                        onChange={() => {
                            getFieldHelpers('rememberMeSwitch').setValue(!getFieldProps('rememberMeSwitch').value)
                        }}
                    />
                    <a onClick={() => { modalStore.closeModal(); modalStore.openModalMini(<PasswordResetRequestForm />) }} style={{ padding: '0 0 0 4rem' }}>{t('Reset password?')}</a>
                    <Button.Group fluid>
                        <Button positive content={t('Login')} type='submit' loading={isSubmitting} />
                        <Button content={t('Cancel')} type='button' onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})