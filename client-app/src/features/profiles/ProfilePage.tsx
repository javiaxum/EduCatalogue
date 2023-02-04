import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileHeader from './ProfileHeader';
import ProfileOptions from './ProfileOptions';

export default observer(function ProfilePage() {


    const { profileStore, commonStore } = useStore();
    const { editMode, setEditMode } = commonStore;
    const { loadProfile, profile } = profileStore;

    useEffect(() => {
        loadProfile();
        // setEditMode(false);
    }, [loadProfile]);


    return (
        <Grid style={{ minWidth: '1000px' }}>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
                {profile && <ProfileHeader />}
            </Grid.Column>
            <Grid.Column width={3} />
            <Grid.Column width={3} />
            <Grid.Column width={10}>
                {profile && <ProfileOptions profile={profile} />}
            </Grid.Column>
            <Grid.Column width={3} />
        </Grid>
    )
})