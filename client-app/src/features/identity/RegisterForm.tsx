    import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore, modalStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', displayName: '', username: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore
                .register(values)
                .catch(error => setErrors({ error }))
            }
            validationSchema={
                Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content='Register' textAlign='left' color='teal' />
                    <CustomTextInput placeholder='DisplayName' name='displayName' />
                    <CustomTextInput placeholder='Username' name='username' />
                    <CustomTextInput placeholder='Email' name='email' />
                    <CustomTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors
                            errors={errors.error}
                        />}
                    />
                    <Button.Group fluid>
                        <Button
                            positive
                            content='Register'
                            type='submit'
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting} />
                        <Button
                            content='Cancel'
                            type='button'
                            onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})