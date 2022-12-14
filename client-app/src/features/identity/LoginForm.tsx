import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dimmer, Header, Label, Segment } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();

    return (

        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore
                .login(values)
                .catch(error => setErrors({ error: 'Invalid email or password' }))
            }
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content='Login' textAlign='left' color='teal' />
                    <CustomTextInput placeholder='Email' name='email' />
                    <CustomTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: '1em', textAlign: 'left !important' }} basic color='red' content={errors.error} />}
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