import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileHeader from './ProfileHeader';
import ProfileOptions from './ProfileOptions';
import { useMediaQuery } from 'react-responsive';

export default observer(function ProfilePage() {


    const { profileStore, commonStore } = useStore();
    const { editMode, setEditMode } = commonStore;
    const { loadProfile, profile } = profileStore;

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    useEffect(() => {
        loadProfile();
        // setEditMode(false);
    }, [loadProfile]);


    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ minWidth: '65rem', width: '80%', margin: '0 auto' }}>
                    <Grid.Row>
                        <ProfileHeader />
                    </Grid.Row>
                    <Grid.Row>
                        {profile && <ProfileOptions profile={profile} />}
                    </Grid.Row>
                </Grid>}
            {isMobile &&
                <Grid style={{ margin: 0, width: '100%' }}>
                    <Grid.Row>
                        <ProfileHeader />
                    </Grid.Row>
                    <Grid.Row>
                        <div style={{ padding: isComputerOrTablet ? '0 3rem 0 3rem' : 0, minHeight: '50rem', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                            {profile && <ProfileOptions profile={profile} />}
                        </div>
                    </Grid.Row>
                </Grid>}
        </>
    )
})