import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import { useTranslation } from 'react-i18next';
import { router } from '../routers/Routes';
import { useParams } from 'react-router-dom';

export default observer(function PasswordChangeForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();
    return (
        <Formik
            initialValues={{ oldPassword: '', newPassword: '', repeatPassword: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore
                    .changePassword(values.newPassword, values.oldPassword)
                    .catch(error => setErrors({ error })).finally(() => modalStore.closeModal())
            }}
            validationSchema={
                Yup.object({
                    oldPassword: Yup.string().required(),
                    newPassword: Yup.string().required(),
                    repeatPassword: Yup.string().required(),
                })}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Password change')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Old Password')} name='oldPassword' type='password' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('New Password')} name='newPassword' type='password' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Password')} name='repeatPassword' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors errors={errors.error} />} />
                    <Button.Group fluid>
                        <Button
                            positive
                            content={t('Submit')}
                            type='submit'
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting} />
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