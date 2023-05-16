import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default observer(function PasswordChangeForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    return (
        <Formik
            initialValues={{ oldPassword: '', newPassword: '', repeatPassword: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore
                    .changePassword(values.newPassword, values.oldPassword).then(() => toast.success(t('Password has been changed successfully!')))
                    .catch(error => setErrors({ error })).finally(() => modalStore.closeModal())
            }}
            validationSchema={
                Yup.object({
                    oldPassword: Yup.string().required(`${t('This is a required field')}`),
                    newPassword: Yup.string()
                        .required(`${t('This is a required field')}`)
                        .min(8, `${t('Password have to be at least 8 characters long')}`)
                        .matches(/[a-z]/, `${t('Password have to contain Latin letters')}`)
                        .matches(/[0-9]/, `${t('Password have to contain numbers')}`),
                    repeatPassword: Yup.string().required(`${t('This is a required field')}`).oneOf([Yup.ref('newPassword'), null], `${t('Passwords must match')}`),
                })}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty, values }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Password change')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Old Password')} name='oldPassword' type='password' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('New Password')} name='newPassword' type='password' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Repeat new password')} name='repeatPassword' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors errors={errors.error} />} />
                    <Button.Group fluid>
                        <Button
                            positive
                            content={t('Submit')}
                            type='submit'
                            loading={isSubmitting}
                            disabled={(!isValid || isSubmitting || !dirty)} />
                        <Button
                            content={t('Cancel')}
                            type='button'
                            onClick={() => { modalStore.closeModal() }} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})