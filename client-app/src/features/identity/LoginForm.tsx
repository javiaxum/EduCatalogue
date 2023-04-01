import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Header, Label } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import PasswordResetRequestForm from './PasswordResetRequestForm';
import { useEffect, useState } from 'react';

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <Formik
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
            {({ handleSubmit, isSubmitting, errors, getFieldProps, getFieldHelpers }) => (
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
                    <a onClick={() => { modalStore.closeModal(); modalStore.openModalMini(<PasswordResetRequestForm />) }} style={{ padding: '0 0 0 4rem' }}>{t('Forgot password?')}</a>
                    <Button.Group fluid>
                        <Button positive content={t('Login')} type='submit' loading={isSubmitting} />
                        <Button content={t('Cancel')} type='button' onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                </Form>)}
        </Formik>
    )
})