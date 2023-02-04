import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon, Item, Segment, Image } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileAvatarUploadWidgetCropper from './profileAvatar/ProfileAvatarUploadWidgetCropper';
import ProfileAvatarUploadWidgetDropzone from './profileAvatar/ProfileAvatarUploadWidgetDropzone';

export default observer(function ProfileHeader() {
    const { commonStore, modalStore, profileStore } = useStore();
    const { editMode, setEditMode } = commonStore;

    const { uploading, profile } = profileStore;
    const { username } = useParams();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function HandleImageUpload(file: Blob) {
        if (username)
            profileStore.setProfileImage(file).then(() => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview));
                setFiles([]);
                setEditMode(false);
            })
    }

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => HandleImageUpload(blob!))
        }
    }

    useEffect(() => {
        return (() => {
            files.forEach((file: any) =>
                URL.revokeObjectURL(file.preview));
        })
    }, [files])

    if (!profile) return <></>

    return (
        <Segment>
            <Grid style={{ paddingTop: '10px', minWidth: '1000px' }}>
                <Grid.Column style={{ width: '14rem' }}>
                    {!editMode
                        ? <Image avatar style={{ minHeight: '12rem', minWidth: '12rem', height: '12rem', width: '12rem', margin: '0.5rem' }} src={profile.avatar?.url || '/assets/user.png'} />
                        : <>
                            {files && files.length == 0 &&
                                <ProfileAvatarUploadWidgetDropzone
                                    setFiles={setFiles}
                                    imageUrl={profile.avatar?.url || '/assets/user.png'} />}
                            {files && files.length > 0 && <>
                                <div className='img-preview' style={{ borderRadius: '1000px', minHeight: '12rem', minWidth: '12rem', overflow: 'hidden', }} />
                            </>}
                            {files && files.length > 0 &&
                                <>
                                    <Header as='h3' content='Image preview' />
                                    <ProfileAvatarUploadWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                    <Button.Group widths={2}>
                                        <Button
                                            positive
                                            type='button'
                                            icon='check'
                                            onClick={onCrop}
                                            loading={uploading}
                                        />
                                        <Button
                                            onClick={() => { files.forEach((file: any) => URL.revokeObjectURL(file.preview)); setFiles([]) }}
                                            type='button'
                                            icon='cancel'
                                            disabled={uploading}
                                        />
                                    </Button.Group>
                                </>}
                        </>}
                </Grid.Column >
                <Grid.Column style={{ width: '400px', paddingTop: '4rem' }}>
                    <Header as='h1' content={profile.displayName} />
                    {!editMode
                        ? <Button
                            onClick={() => setEditMode(!editMode)}>
                            Set profile image<Icon name='image' style={{ padding: '0 0 0 0.5rem', margin: '0' }} />
                        </Button>
                        : <Button
                            onClick={() => setEditMode(false)}
                            type='button'
                            content='Cancel'
                        />}
                </Grid.Column >
            </Grid >
        </Segment>
    )
})