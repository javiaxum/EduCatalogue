import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Grid, Menu } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileInstitutionPendingChangesList from './ProfileInstitutionPendingChangesList';
import ProfileManagedInstitutions from './ProfileManagedInstitutions';
import ProfileReviews from './ProfileReviews';
import ProfileSettingsGeneral from './ProfileSettingsGeneral';
import ProfileSettingsSecurity from './ProfileSettingsSecurity';

interface Props {
    profile: Profile
}

export default observer(function ProfileOptions({ profile }: Props) {
    const { profileStore: { isCurrentUser } } = useStore();
    const [menuItem, setMenuItem] = useState<string>('General');

    const { t } = useTranslation();

    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    if (!isCurrentUser) return <></>

    const items = [
        'General',
        'Security',
        'Managed institutions',
        'Pending changes',
        'Reviews'];
    const components = [
        <ProfileSettingsGeneral profile={profile} />,
        <ProfileSettingsSecurity profile={profile} />,
        <ProfileManagedInstitutions institutions={profile.managedInstitutions} />,
        <ProfileInstitutionPendingChangesList profile={profile}/>,
        <ProfileReviews profile={profile} />,
    ]
    return (
        <Grid style={{ width: '100%', margin: 0 }}>
            <Grid.Row >
                <Menu pointing secondary stackable={isMobile} style={{ width: '100%', textAlign: 'center' }}>
                    {items.map((i, index) =>
                        <Menu.Item
                            name={i}
                            key={index}
                            active={menuItem === i}
                            content={t(i)}
                            onClick={() => setMenuItem(i)} />)}
                </Menu>
            </Grid.Row>
            <Grid.Row>
                {components[items.indexOf(menuItem)]}
            </Grid.Row>
        </Grid>
    )
})