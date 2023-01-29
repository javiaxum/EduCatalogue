import { Formik } from 'formik';
import React from 'react';
import { Button, Form, Grid, Header, Label, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import * as Yup from 'yup';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { User } from '../../app/models/user';

interface Props {
    profile: Profile
}

export default observer(function ProfileSettings({ profile }: Props) {

    const validationSchema = Yup.object({
        DisplayName: Yup.string().required('Institution name is required'),
    })


    function handleProfileFormSubmit(profile: Profile) {

    }

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={profile!}
                onSubmit={values => handleProfileFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Grid style={{ padding: '1rem' }}>
                            <Grid.Row style={{ padding: '0' }}>
                                <Grid.Column style={{ width: '110px', padding: '0.5rem 0 1rem 1rem' }}>
                                    Username:
                                </Grid.Column>
                                <Grid.Column width={4} style={{ padding: '0' }}>
                                    <CustomTextInput disabled={true} placeholder='Username' name='username' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: '0' }}>
                                <Grid.Column style={{ width: '110px', padding: '0.5rem 0 1rem 1rem' }}>
                                    Display name:
                                </Grid.Column>
                                <Grid.Column width={4} style={{ padding: '0' }}>
                                    <CustomTextInput placeholder='DisplayName' name='displayName' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: '0' }}>
                                <Grid.Column style={{ width: '110px', padding: '0.5rem 0 1rem 1rem' }}>
                                    Email:
                                </Grid.Column>
                                <Grid.Column width={4} style={{ padding: '0' }}>
                                    <CustomTextInput placeholder='DisplayName' name='email' />
                                </Grid.Column>
                                <Grid.Column width={5} style={{ padding: '0 0 0 1rem' }}>
                                    {profile?.emailConfirmed
                                        ? <Label positive color='green' content='Confirmed' />
                                        : <Button basic color='red' content='Confirm Email' />}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ padding: '0' }}>
                                <Grid.Column style={{ width: '480px', padding: '0.5rem 0 1rem 1rem' }}>
                                    Two Factor authentication: {profile?.twoFactorEnabled
                                        ? <Button positive color='green' content='Enabled' />
                                        : <Button color='red' content='Disabled' />}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>)}
            </Formik>
        </>
    )
})