import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Divider, Header, Icon, Label } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import PasswordResetRequestForm from './PasswordResetRequestForm';
import { useEffect, useState } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <Formik
            validationSchema={
                Yup.object({
                    email: Yup.string().required(`${t('This is a required field')}`).email(`${t('This should be a valid email')}`),
                    password: Yup.string()
                        .required(`${t('This is a required field')}`)
                })
            }
            initialValues={{ email: '', password: '', code: '', error: null, rememberMeSwitch: false }}
            onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
                if (values.code.length === 0)
                    userStore.get2FAStatus(values).then((result) => {
                        if (result !== undefined)
                            setTwoFactor(result);
                        if (!result)
                            userStore
                                .login(values)
                                .catch(error => { setErrors({ error: 'Invalid email or password' }); })
                                .finally(() => { setSubmitting(false); resetForm(); setTwoFactor(false); })
                        else setSubmitting(false);
                    });
                else {
                    userStore
                        .login(values)
                        .catch(error => { setErrors({ error: 'Invalid email or password' }); })
                        .finally(() => { setSubmitting(false); resetForm(); setTwoFactor(false); })
                }
            }}>
            {({ handleSubmit, isSubmitting, errors, getFieldProps, getFieldHelpers, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Login')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.3rem' width='100%' placeholder='Email' name='email' />
                    <CustomTextInput margin='0.3rem' width='100%' placeholder={t('Password')} name='password' type='password' />
                    {twoFactor && <CustomTextInput margin='0.3rem' width='100%' placeholder={t('Enter 6-digit code')} name='code' />}
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
                    <Button
                        color='blue'
                        compact
                        basic
                        onClick={() => { modalStore.closeModal(); modalStore.openModalMini(<PasswordResetRequestForm />) }}
                        style={{ display: 'inline', position: 'absolute', right: 0 }}>
                        {t('Forgot password?')}
                    </Button>
                    <Button.Group fluid>
                        <Button positive content={t('Login')} type='submit' disabled={!isValid || isSubmitting || !dirty} loading={isSubmitting} />
                        <Button content={t('Cancel')} type='button' onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                    <Divider />
                    <Button
                        style={{ width: '100%', textAlign: 'center' }}
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
                        <Icon name='facebook' size='large' style={{ right: '-1.2rem', position: 'relative', top: '-0.3rem' }} />
                    </Button>
                </Form>)}
        </Formik>
    )
})