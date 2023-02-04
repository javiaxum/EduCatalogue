import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Item, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileAvatarForm from './ProfileAvatarForm';

interface Props {
    profile: Profile
}

export default observer(function ProfileHeader({ profile }: Props) {
    const { commonStore, modalStore } = useStore();

    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    // function HandleImageUpload(file: Blob) {
    //     if (id)
    //         setProfileImage(file, id).then(() => {
    //             files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    //             setFiles([]);
    //         })
    // }

    // function onCrop() {
    //     if (cropper) {
    //         cropper.getCroppedCanvas().toBlob(blob => HandleImageUpload(blob!))
    //     }
    // }

    // useEffect(() => {
    //     return (() => {
    //         files.forEach((file: any) =>
    //          URL.revokeObjectURL(file.preview));
    //     })
    // }, [files])

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
                                    <Button
                                        style={{ position: 'absolute', opacity: '90%', padding: '0', height: '3rem', width: '12rem', left: '13rem', top: '9rem', zIndex: '1000' }}
                                        onClick={() => modalStore.openModal(<ProfileAvatarForm />)}>
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