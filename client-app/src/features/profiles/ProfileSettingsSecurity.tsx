import { Button, Divider, Grid, Header, Input, Label, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useTranslation } from 'react-i18next';
import PasswordChangeForm from '../identity/PasswordChangeForm';
import AccountDeleteForm from '../identity/AccountDeleteForm';
import TwoFAActivationForm from '../identity/TwoFactorConfirmationForm';
import { useState } from 'react';
import TwoFactorConfirmationForm from '../identity/TwoFactorConfirmationForm';

interface Props {
    profile: Profile
}

export default observer(function ProfileSettingsSecurity({ profile }: Props) {
    const { t } = useTranslation();
    const { modalStore, userStore } = useStore();
    const [twoFactorActivationForm, setTwoFactorConfirmationForm] = useState(false);
    const action = !profile.twoFactorEnabled ? userStore.request2FAActivationCode : userStore.request2FADeactivationCode;

    return (
        <Segment style={{ width: '100%' }}>
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
                            content={t('Password')} style={{ margin: '2rem 0 0 0' }} />
                    </Grid.Row>
                    <Grid.Row>
                        <Input defaultValue={'1111111111111'} type='password' disabled style={{ display: 'block', padding: '0 0 0.2rem 0' }} />
                        <Button
                            onClick={() => modalStore.openModalMini(<PasswordChangeForm />)}>
                            {t('Change password')}
                        </Button>
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h4'
                            content={t('Two Factor authentication')}
                            style={{ margin: '3rem 0 0 0' }} />
                        <Button
                            animated
                            positive={profile.twoFactorEnabled}
                            negative={!profile.twoFactorEnabled}
                            loading={userStore.loading}
                            style={{ width: '13rem' }}
                            onClick={() => { action().then(() => setTwoFactorConfirmationForm(true)) }}>
                            <Button.Content visible content={!profile.twoFactorEnabled ? t('2FA is inactive') : t('2FA activated')} />
                            {!profile.twoFactorEnabled ?
                                <Button.Content hidden content={t('Activate 2FA')} /> :
                                <Button.Content hidden content={t('Deactivate 2FA')} />}
                        </Button>
                        {twoFactorActivationForm &&
                            <TwoFactorConfirmationForm
                                action={!profile.twoFactorEnabled ? userStore.confirm2FAActivation : userStore.confirm2FADeactivation}
                                setForm={setTwoFactorConfirmationForm} />}
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column verticalAlign='bottom'>
                    <Grid.Row verticalAlign='bottom'>
                        <Header
                            as='h4'
                            content={t('Account')} style={{ margin: 0 }} />
                        <Button negative style={{ width: 'fit-content' }} onClick={() => { modalStore.openModalMini(<AccountDeleteForm />) }}>
                            {t("Delete account")}
                        </Button>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Segment >
    )
})