import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon, Item, Segment } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileAvatarUploadWidgetCropper from './profileAvatar/ProfileAvatarUploadWidgetCropper';
import ProfileAvatarUploadWidgetDropzone from './profileAvatar/ProfileAvatarUploadWidgetDropzone';

export default observer(function ProfileHeader() {
    const { commonStore, modalStore, profileStore } = useStore();
    const { editMode, setEditMode } = commonStore;

    const { uploading, profile } = profileStore;
    const { id } = useParams();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function HandleImageUpload(file: Blob) {
        if (id)
            profileStore.setProfileImage(file, id).then(() => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview));
                setFiles([]);
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
        <Grid style={{ paddingTop: '10px' }}>
            <Grid.Column width={16}>
                <Segment>
                    <Item.Group>
                        <Item>
                            {!editMode
                                ? <Item.Image avatar style={{ minHeight: '12rem', minWidth: '12rem', height: '12rem', width: '12rem' }}src={profile.image || '/assets/user.png'} />
                                : <>
                                    {files && files.length == 0 &&
                                        <ProfileAvatarUploadWidgetDropzone
                                            setFiles={setFiles}
                                            imageUrl={profile.image?.url || '/assets/user.png'} />}
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
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                                <Item.Content>
                                    {!editMode ?
                                        <Button
                                            style={{ position: 'absolute', opacity: '90%', padding: '0', height: '3rem', width: '12rem', left: '13rem', top: '9rem', zIndex: '1000' }}
                                            onClick={() => setEditMode(!editMode)}>
                                            Set profile image<Icon name='image' style={{ padding: '0 0 0 0.5rem', margin: '0' }} />
                                        </Button>
                                        : <Button.Group style={{ width: '16rem', margin: '0 0 0 auto', height: '35px' }}>
                                            <Button
                                                onClick={() => setEditMode(false)}
                                                type='button'
                                                content='Cancel'
                                            />
                                        </Button.Group>}
                                </Item.Content>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})