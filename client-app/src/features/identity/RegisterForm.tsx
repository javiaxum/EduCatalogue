import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Divider, Header, Icon } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import { useTranslation } from 'react-i18next';
import FacebookLogin from '@greatsumini/react-facebook-login';

export default observer(function RegisterForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    return (
        <Formik
            initialValues={{ email: '', password: '', displayName: '', username: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore
                .register(values)
                .catch(error => setErrors({ error }))
            }
            validationSchema={
                Yup.object({
                    email: Yup.string().required(`${t('This is a required field')}`).email(`${t('This should be a valid email')}`),
                    password: Yup.string()
                        .required(`${t('This is a required field')}`)
                        .min(8, `${t('Password have to be at least 8 characters long')}`)
                        .matches(/[a-z]/, `${t('Password have to contain Latin letters')}`)
                        .matches(/[0-9]/, `${t('Password have to contain numbers')}`),
                    displayName: Yup.string().required(`${t('This is a required field')}`),
                    username: Yup.string().required(`${t('This is a required field')}`),
                })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Register')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Display name')} name='displayName' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Username')} name='username' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Email')} name='email' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Password')} name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors errors={errors.error} />} />
                    <Button.Group fluid>
                        <Button
                            positive
                            content={t('Register')}
                            type='submit'
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting || !dirty} />
                        <Button
                            content={t('Cancel')}
                            type='button'
                            onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                    <Divider />  
                    <Button
                        style={{width: '100%', textAlign: 'center'}}
                        as={FacebookLogin}
                        appId='1181277965779433'
                        loading={userStore.fbLoading}
                        size='huge'
                        inverted
                        color='facebook'
                        onSuccess={(response: any) => {
                            userStore.fbLogin(response.accessToken);
                        }}
                        onFail={(response: any) => {
                            console.log('Login failure')
                        }}>
                        {t('Sign in with Facebook')}
                        <Icon name='facebook' size='large' style={{right: '-1.2rem', position: 'relative', top: '-0.3rem'}} />
                    </Button>
                </Form>
            )}
        </Formik>
    )
})