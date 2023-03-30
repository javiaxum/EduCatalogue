import { Formik } from 'formik';
import React from 'react';
import { Button, Divider, Form, Grid, Header, Input, Label, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import * as Yup from 'yup';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useTranslation } from 'react-i18next';
import modalStore from '../../app/stores/modalStore';
import userStore from '../../app/stores/userStore';
import EmailChangeForm from '../identity/EmailChangeForm';
import PasswordChangeForm from '../identity/PasswordChangeForm';
import AccountDeleteForm from '../identity/AccountDeleteForm';

interface Props {
    profile: Profile
}

export default observer(function ProfileSettingsSecurity({ profile }: Props) {
    const { t } = useTranslation();
    const { modalStore } = useStore()

    return (
        <Segment>
            <Grid columns={2} stackable >
                <Divider vertical />
                <Grid.Column>
                    <Grid.Row>
                        <Header
                            as='h2'
                            content={t('Access')}
                            style={{ margin: '1rem 0 0 0' }} />
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h4'
                            content={t('Password')} />
                        <Input defaultValue={'1111111111111'} type='password' disabled style={{ display: 'block', padding: '0 0 0.2rem 0' }} />
                        <Button
                            onClick={() => modalStore.openModalMini(<PasswordChangeForm />)}>
                            {t('Change password')}
                        </Button>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '0' }}>
                        <Header
                            as='h4'
                            content={t('Two Factor authentication')}
                            style={{ margin: '3rem 0 0 0' }} />
                        {!profile?.twoFactorEnabled ?
                            <Button animated negative style={{ width: '13rem' }} onClick={() => { }}>
                                <Button.Content visible content={t('2FA is inactive')} />
                                <Button.Content hidden content={t('Activate 2FA')} />
                            </Button> :
                            <Label color='green' content={t('2FA activated')} />}
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column verticalAlign='bottom'>
                    <Grid.Row verticalAlign='bottom'>
                        <Header
                            as='h4'
                            content={t('Account')} />
                        <Button negative style={{ width: 'fit-content' }} onClick={() => { modalStore.openModalMini(<AccountDeleteForm />) }}>
                            {t("Delete account")}
                        </Button>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})