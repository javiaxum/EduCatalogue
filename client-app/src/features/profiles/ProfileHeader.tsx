import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Item, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
    profile: Profile
}

export default observer(function ProfileHeader({ profile }: Props) {
    const { commonStore } = useStore();

    // useEffect(() => {
    //     return () => { commonStore.setEditMode(false) }
    // })

    return (
        <Grid style={{ paddingTop: '10px' }}>
            <Grid.Column width={16}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                                <Item.Content>
                                <Button style={{ position: 'absolute', opacity: '90%', padding: '0', height: '3rem', width: '12rem', left: '11rem', top: '9rem', zIndex: '1000' }}>
                                    Set profile image<Icon name='image' style={{ padding: '0 0 0 0.5rem', margin: '0' }} />
                                </Button>
                            </Item.Content>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})