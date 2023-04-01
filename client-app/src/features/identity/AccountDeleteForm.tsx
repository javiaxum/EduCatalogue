import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Button, Header, Label } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function AccountDeleteForm() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{ username: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .deleteUser()
                    .catch(error => setErrors({ error: 'Invalid username' })).finally(() => modalStore.closeModal())}>
            {({ handleSubmit, isSubmitting, errors, getFieldProps, getFieldHelpers, values }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('Delete account') + '?'} textAlign='left' color='teal' />
                    <Header as='h5' content={t('Type your username in the field below to confirm account deletion')} textAlign='left' />
                    <CustomTextInput margin='0.3rem' width='100%' placeholder={t('Username')} name='username' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: '1em', textAlign: 'left !important' }} basic color='red' content={errors.error} />} />
                    <Button.Group fluid>
                        <Button
                            negative
                            disabled={values.username !== userStore.user?.username}
                            content={t('Submit delete request')}
                            type='submit'
                            loading={isSubmitting} 
                            style={{ height: 'fit-content', maxWidth: '13rem'}}/>
                        <Button
                            content={t('Cancel')}
                            type='button'
                            onClick={() => modalStore.closeModal()} />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})