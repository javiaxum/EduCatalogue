import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction } from 'react';
import { Button, Header } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import { useTranslation } from 'react-i18next';
import { router } from '../routers/Routes';
import { useParams } from 'react-router-dom';

interface Props {
    setForm: Dispatch<SetStateAction<boolean>>;
    action: (code: string) => Promise<void>;
}

export default observer(function TwoFactorConfirmationForm(props: Props) {
    const { userStore, modalStore, profileStore } = useStore();
    const { t } = useTranslation();
    return (
        <Formik
            initialValues={{ code: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                props.action(values.code)
                    .catch(error => setErrors({ error })).finally(() => modalStore.closeModal()).finally(() => props.setForm(false))
            }}
            validationSchema={
                Yup.object({
                    code: Yup.number().min(6),
                })} >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content={t('The code has been sent to your email')} textAlign='left' style={{color: '#444', margin: '3rem 0 0 0'}} />
                    <CustomTextInput margin='0.4rem 0' width='100%' placeholder={t('Enter 6-digit code')} name='code' />
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
                            disabled={!isValid || isSubmitting || !dirty} />
                        <Button
                            content={t('Cancel')}
                            type='button'
                            onClick={() => props.setForm(false) } />
                    </Button.Group>
                </Form>
            )}
        </Formik>
    )
})