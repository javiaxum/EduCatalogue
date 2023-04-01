import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon, Item, Segment, Image } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileAvatarUploadWidgetCropper from './profileAvatar/ProfileAvatarUploadWidgetCropper';
import ProfileAvatarUploadWidgetDropzone from './profileAvatar/ProfileAvatarUploadWidgetDropzone';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export default observer(function ProfileHeader() {
    const { commonStore, modalStore, profileStore } = useStore();
    const { editMode, setEditMode } = commonStore;

    const { uploading, profile } = profileStore;
    const { username } = useParams();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const { t } = useTranslation();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    const imageSize = isComputerOrTablet ? "12rem" : "16rem";

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

    if (!profile) return <></>;

    return (
        <Segment style={{ paddingTop: '2rem', width: '100%' }}>
            <Grid>
                <Grid.Column style={{ width: isComputerOrTablet ? '14rem' : '100%' }} textAlign='center'>
                    {!editMode
                        ? <Image avatar style={{ minHeight: imageSize, minWidth: imageSize, height: imageSize, width: imageSize, margin: '0.5rem' }} src={profile.avatar?.url || '/assets/user.png'} />
                        : <>
                            {files && files.length == 0 &&
                                <ProfileAvatarUploadWidgetDropzone
                                    imageSize={imageSize}
                                    setFiles={setFiles}
                                    imageUrl={profile.avatar?.url || '/assets/user.png'} />}
                            {files && files.length > 0 && <>
                                <div className='img-preview' style={{ borderRadius: '1000rem', minHeight: imageSize, minWidth: imageSize, overflow: 'hidden', }} />
                            </>}
                            {files && files.length > 0 &&
                                <>
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
                <Grid.Column style={{ width: '30rem', paddingTop: isComputerOrTablet ? '4rem' : 0 }}>
                    <Header as='h1' content={profile.displayName} />
                    {!editMode
                        ? <Button
                            onClick={() => setEditMode(!editMode)}>
                            {t('Set profile image')}<Icon name='image' style={{ padding: '0 0 0 0.5rem', margin: '0' }} />
                        </Button>
                        : <Button
                            onClick={() => setEditMode(false)}
                            type='button'
                            content={t('Cancel')}
                        />}
                </Grid.Column >
            </Grid >
        </Segment>
    )
})