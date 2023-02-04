import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Item, Menu, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileManagedInstitutions from './ProfileManagedInstitutions';
import ProfileReviews from './ProfileReviews';
import ProfileSettings from './ProfileSettings';

interface Props {
    profile: Profile
}

export default observer(function ProfileOptions({ profile }: Props) {
    const { commonStore, userStore, profileStore: {isCurrentUser} } = useStore();
    const [menuItem, setMenuItem] = useState<string>('Profile');

    if(!isCurrentUser) return <></>

    return (
        <Grid style={{ paddingTop: '10px' }}>
            <Grid.Column width={16}>
                <Menu tabular attached='top'>
                    <Menu.Item
                        name='Profile'
                        active={menuItem === 'Profile'}
                        onClick={() => setMenuItem('Profile')}
                    />
                    <Menu.Item
                        name='Managed institution'
                        active={menuItem === 'Managed institutions'}
                        onClick={() => setMenuItem('Managed institutions')}
                    />
                    <Menu.Item
                        name='Pending changes'
                        active={menuItem === 'Pending changes'}
                        onClick={() => setMenuItem('Pending changes')}
                    />
                    <Menu.Item
                        name='Reviews'
                        active={menuItem === 'Reviews'}
                        onClick={() => setMenuItem('Reviews')}
                    />
                </Menu>
                <Segment attached='bottom'>
                    {menuItem === 'Profile' && <ProfileSettings profile={profile} />}
                    {(menuItem === 'Reviews' && profile.reviews)
                        && <ProfileReviews reviews={profile.reviews} />}
                    {(menuItem === 'Managed institutions' && profile.reviews)
                        && <ProfileManagedInstitutions institutions={profile.managedInstitutions} />}
                </Segment>
            </Grid.Column>
        </Grid>
    )
})