import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Checkbox, Dimmer, Header, Label, Segment } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();
    return (

        <Formik
            initialValues={{ email: '', password: '', error: null, rememberMeSwitch: false }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .login(values)
                    .catch(error => setErrors({ error: 'Invalid email or password' }))
            }
        >
            {({ handleSubmit, isSubmitting, errors, getFieldProps, getFieldHelpers }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content='Login' textAlign='left' color='teal' />
                    <CustomTextInput placeholder='Email' name='email' />
                    <CustomTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: '1em', textAlign: 'left !important' }} basic color='red' content={errors.error} />}
                    />
                    <Checkbox
                        label={'Remember me'}
                        style={{ padding: '0 0 1rem 0' }}
                        onChange={() => {
                            getFieldHelpers('rememberMeSwitch').setValue(!getFieldProps('rememberMeSwitch').value)
                        }}
                    />
                    <Button.Group fluid>
                        <Button positive content='Login' type='submit' loading={isSubmitting} />
                        <Button content='Cancel' type='button' onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})