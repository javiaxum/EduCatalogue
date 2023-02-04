import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Dimmer, Grid, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import ImageUploadWidgetCropper from '../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { useStore } from '../../app/stores/store';
import ProfileAvatarUploadWidgetCropper from './profileAvatar/ProfileAvatarUploadWidgetCropper';
import ProfileAvatarWidgetDropzone from './profileAvatar/ProfileAvatarUploadWidgetDropzone';

export default observer(function ProfileAvatarForm() {
    const { profileStore, modalStore } = useStore();
    const { uploading, profile } = profileStore
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
        <Segment style={{ paddingTop: '10px', minWidth: '600px' }}>
            <Grid>
                <Grid.Column style={{width: '24.3rem'}}>
                    {files && files.length == 0 && <ProfileAvatarWidgetDropzone
                        setFiles={setFiles}
                        imageUrl={profile.image?.url || '/assets/user.png'} />}
                    {files && files.length > 0 && <>
                        <div className='img-preview' style={{ borderRadius: '1000px', minHeight: '22rem', minWidth: '22rem', overflow: 'hidden', }} />
                    </>}
                    {files && files.length > 0 &&
                        <Container style={{ minHeight: '22rem', minWidth: '12rem', paddingTop: '3rem' }}>
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
                        </Container>}
                    {/* <Header as='h1' content={profile.displayName} /> */}
                </Grid.Column>
                <Grid.Column style={{width: '400px'}}>
                    <Item.Group>
                        <Item>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})