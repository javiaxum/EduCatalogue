import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Item, Menu, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileSettings from './ProfileSettings';

interface Props {
    profile: Profile
}

export default observer(function ProfileOptions({ profile }: Props) {
    const { commonStore, userStore } = useStore();
    const [menuItem, setMenuItem] = useState<string>('Profile');
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
                        active={menuItem === 'Managed institution'}
                        onClick={() => setMenuItem('Managed institution')}
                    />
                    <Menu.Item
                        name='Pending changes'
                        active={menuItem === 'Pending changes'}
                        onClick={() => setMenuItem('Pending changes')}
                    />
                    <Menu.Item
                        name='Tracked institutions'
                        active={menuItem === 'Tracked institutions'}
                        onClick={() => setMenuItem('Tracked institutions')}
                    />
                </Menu>
                <Segment attached='bottom'>
                    {(menuItem === 'Profile' && userStore.user?.username === profile.username) && <ProfileSettings profile={profile} />}
                </Segment>
            </Grid.Column>
        </Grid>
    )
})