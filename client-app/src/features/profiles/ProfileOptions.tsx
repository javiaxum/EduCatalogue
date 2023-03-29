import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Item, Menu, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileInstitutionPendingChangesList from './ProfileInstitutionPendingChangesList';
import ProfileManagedInstitutions from './ProfileManagedInstitutions';
import ProfileReviews from './ProfileReviews';
import ProfileSettings from './ProfileSettingsGeneral';
import ProfileSettingsSecurity from './ProfileSettingsSecurity';

interface Props {
    profile: Profile
}

export default observer(function ProfileOptions({ profile }: Props) {
    const { commonStore, userStore, profileStore: { isCurrentUser } } = useStore();
    const [menuItem, setMenuItem] = useState<string>('General');

    const { t } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    if (!isCurrentUser) return <></>

    const items = [
        'General',
        'Security',
        'Managed institutions',
        'Pending changes',
        'Reviews'];
    const components = [
        <ProfileSettings profile={profile} />,
        <ProfileSettingsSecurity profile={profile} />,
        <ProfileManagedInstitutions institutions={profile.managedInstitutions} />,
        <ProfileInstitutionPendingChangesList />,
        <ProfileReviews profile={profile} reviews={profile.reviews} />,
    ]
    return (
        <>
            <Menu pointing secondary stackable={isMobile} >
                {items.map((i, index) =>
                    <Menu.Item
                        name={i}
                        key={index}
                        active={menuItem === i}
                        content={t(i)}
                        onClick={() => setMenuItem(i)}
                    />
                )}
            </Menu>
            {components[items.indexOf(menuItem)]}
        </>
    )
})