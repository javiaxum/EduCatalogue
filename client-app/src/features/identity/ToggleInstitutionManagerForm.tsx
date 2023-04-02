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
import { toast } from 'react-toastify';

export default observer(function ToggleInstitutionManagerForm() {
    const { userStore, modalStore, institutionStore } = useStore();
    const { t } = useTranslation();
    const { token } = useParams();
    return (
        <Formik
            initialValues={{ username: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore
                    .toggleInstitutionManager(values.username, institutionStore.selectedInstitution?.id!).then(() => toast.success(t('Manager has been toggled successfully!')))
                    .catch(error => setErrors({ error })).finally(() => modalStore.closeModal())
            }}
            validationSchema={
                Yup.object({
                    username: Yup.string().required(),
                })} >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Toggle institution manager')} textAlign='left' color='teal' />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Username')} name='username' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors errors={errors.error} />}
                    />
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
                            onClick={() => { modalStore.closeModal(); }} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})