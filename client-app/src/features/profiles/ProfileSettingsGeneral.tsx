import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
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
    const { modalStore, userStore, profileStore } = useStore();
    const [profileFormValues, setProfileFormValues] = useState<ProfileInfoFormValues>(new ProfileInfoFormValues())

    useEffect(() => {
        let formValues = new ProfileInfoFormValues(profileStore.profile);
        setProfileFormValues(formValues);
    }, [profileStore.profile])

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display name is required'),
        location: Yup.string(),
        company: Yup.string(),
        socialAccount1: Yup.string(),
        socialAccount2: Yup.string(),
        socialAccount3: Yup.string(),
    })

    function handleProfileFormSubmit(profileFormValues: ProfileInfoFormValues) {
        profileStore.setProfileBio(profileFormValues).then();
    }

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={profileFormValues}
                onSubmit={(values, { resetForm }) => { handleProfileFormSubmit(values); resetForm() }}>
                {({ handleSubmit, isValid, isSubmitting, dirty, getFieldHelpers, getFieldProps, resetForm }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Segment>
                            <Grid columns={2} stackable >
                                <Divider vertical />
                                <Grid.Column>
                                    <Grid.Row>
                                        <Header
                                            as='h2'
                                            content={t('Account')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Header
                                            as='h4'
                                            content={t('Username')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                        <Input defaultValue={profile.username || ''} disabled style={{ display: 'block', padding: '0 0 0.2rem 0' }} />
                                    </Grid.Row>
                                    <Grid.Row>
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
                                    <Grid.Row>
                                        <Header
                                            as='h4'
                                            content={t('Email')}
                                            style={{ margin: '3rem 0 0 0' }} />
                                        <Input defaultValue={profile.email || ''} disabled style={{ display: 'block', padding: '0 0 0.2rem 0' }} />
                                        {!profile.emailConfirmed ?
                                            <Button animated negative type='button' style={{ width: 'fit-content' }} onClick={() => userStore.requestEmailConfirmationMessage()}>
                                                <Button.Content visible content={t('Email is not confirmed')} />
                                                <Button.Content hidden content={t('Send confirmation message')} />
                                            </Button> :
                                            <Label color='green' content={t('Email is confirmed')} />}
                                        <Button
                                            type='button'
                                            onClick={() => modalStore.openModalMini(<EmailChangeForm />)}>
                                            {t('Change email')}
                                        </Button>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid.Row>
                                        <Header
                                            as='h2'
                                            content={t('Bio')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                    </Grid.Row>
                                    <Grid.Row>
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
                                    <Grid.Row>
                                        <Header
                                            as='h4'
                                            content={t('Social accounts')}
                                            style={{ margin: '1rem 0 0 0' }} />
                                        <CustomTextInput
                                            margin='0 0 0.2rem 0'
                                            width='80%'
                                            placeholder='Social account'
                                            name='socialAccount1' />
                                        <CustomTextInput
                                            margin='0 0 0.2rem 0'
                                            width='80%'
                                            placeholder='Social account'
                                            name='socialAccount2' />
                                        <CustomTextInput
                                            margin='0 0 0.2rem 0'
                                            width='80%'
                                            placeholder='Social account'
                                            name='socialAccount3' />
                                    </Grid.Row>
                                    <Grid.Row>
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
                            <Button
                                positive
                                disabled={!isValid || isSubmitting}
                                loading={profileStore.uploading || isSubmitting}
                                type='submit' >
                                {t('Upload')}
                            </Button>}
                    </Form>)}
            </Formik>
        </>
    )
})