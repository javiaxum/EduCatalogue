import { Field, Formik } from 'formik';
import React from 'react';
import { Button, Divider, Form, Grid, Header, Input, Label, Segment } from 'semantic-ui-react';
import { Profile, ProfileInfoFormValues } from '../../app/models/profile';
import * as Yup from 'yup';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useTranslation } from 'react-i18next';
import EmailChangeForm from '../identity/EmailChangeForm';

interface Props {
    profile: Profile;
}

export default observer(function ProfileSettingsGeneral({ profile }: Props) {
    const { t } = useTranslation();
    const { modalStore, userStore } = useStore();
    const validationSchema = Yup.object({
        DisplayName: Yup.string().required('Institution name is required'),
    })


    function handleProfileFormSubmit(profile: ProfileInfoFormValues) {

    }

    

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={new ProfileInfoFormValues(profile!)}
                onSubmit={values => handleProfileFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Segment>
                            <Grid columns={2} stackable >
                                <Divider vertical />
                                <Grid.Column>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <Header
                                            as='h2'
                                            content={t('Account')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                    </Grid.Row>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <Header
                                            as='h4'
                                            content={t('Username')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                        <Input defaultValue={profile.username || ''} disabled style={{ display: 'block', padding: '0 0 0.2rem 0' }} />
                                    </Grid.Row>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <CustomTextInput
                                            width='100%'
                                            label={
                                                <Header
                                                    as='h4'
                                                    content={t('Display name')}
                                                    style={{ margin: '1rem 0 0 0' }} />}
                                            placeholder='DisplayName'
                                            name='displayName' />
                                    </Grid.Row>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <Header
                                            as='h4'
                                            content={t('Email')}
                                            style={{ margin: '3rem 0 0 0' }} />
                                        <Input defaultValue={profile.email || ''} disabled style={{ display: 'block', padding: '0 0 0.2rem 0' }} />
                                        {!profile.emailConfirmed ?
                                            <Button animated negative style={{ width: '13rem' }} onClick={() => userStore.requestEmailConfirmationMessage()}>
                                                <Button.Content visible content={t('Email is not confirmed')} />
                                                <Button.Content hidden content={t('Send confirmation message')} />
                                            </Button> :
                                            <Label color='green' content={t('Email is confirmed')} />}
                                        <Button
                                            onClick={() => modalStore.openModalMini(<EmailChangeForm />)}>
                                            {t('Change email')}
                                        </Button>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <Header
                                            as='h2'
                                            content={t('Bio')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                    </Grid.Row>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <CustomTextInput
                                            width='100%'
                                            label={
                                                <Header
                                                    as='h4'
                                                    content={t('Location')}
                                                    style={{ margin: '1rem 0 0 0' }} />}
                                            placeholder='Location'
                                            name='location' />
                                    </Grid.Row>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <Header
                                            as='h4'
                                            content={t('Social accounts')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                        <CustomTextInput
                                            margin='0 0 0.2rem 0'
                                            width='80%'
                                            placeholder='Social account'
                                            name='socialAccounts' />
                                        <CustomTextInput
                                            margin='0 0 0.2rem 0'
                                            width='80%'
                                            placeholder='Social account'
                                            name='socialAccounts' />
                                        <CustomTextInput
                                            margin='0 0 0.2rem 0'
                                            width='80%'
                                            placeholder='Social account'
                                            name='socialAccounts' />
                                    </Grid.Row>
                                    <Grid.Row style={{ padding: '0' }}>
                                        <CustomTextInput
                                            width='100%'
                                            label={
                                                <Header
                                                    as='h4'
                                                    content={t('Company')}
                                                    style={{ margin: '1rem 0 0 0' }} />}
                                            placeholder='Company'
                                            name='company' />
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        {dirty &&
                            <Button positive>
                                {t('Upload')}
                            </Button>}
                    </Form>)}
            </Formik>
        </>
    )
})