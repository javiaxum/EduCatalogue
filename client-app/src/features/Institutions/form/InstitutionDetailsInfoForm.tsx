import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import ImageUploadWidgetCropper from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { useStore } from '../../../app/stores/store';

export default observer(function InstitutionDetailsInfoForm() {
    const { institutionStore } = useStore();
    const {
        selectedInstitution,
        setTitleImage,
        uploading } = institutionStore;
    const { id } = useParams();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function HandleImageUpload(file: Blob) {
        if (id)
            setTitleImage(file, id).then(() => {
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
    const { t } = useTranslation();

    return (
        <Grid style={{ minWidth: '1000px' }}>
            <Grid.Column width={10}>
                <Grid style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='info' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            {t('Description') + ': '}
                            <CustomTextArea rows={6} placeholder='Description' name='description' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='graduation' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            {t("Student count") + ': '}
                            <CustomTextInput type='number' placeholder='Student count' name='studentCount' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='chain' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            {t('Homepage') + ': '}
                            <CustomTextInput placeholder='SiteURL' name='siteURL' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='phone' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            {t('Contact information') + ': '}
                            <CustomTextInput placeholder='Contact Information' name='contactInformation' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
                {(files && files.length === 0) &&
                    <ImageUploadWidgetDropzone
                        setFiles={setFiles}
                        imageUrl={selectedInstitution?.images.find((x) => x.id === selectedInstitution.titleImageId)?.url || '/assets/institutionTitleImagePlaceholder.png'} />}
                {(files && files.length > 0) && <>
                    <div className='img-preview' style={{ borderRadius: '30px', minHeight: '22rem', minWidth: '22rem', overflow: 'hidden', }} />
                </>}
                {(files && files.length > 0) &&
                    <Container style={{ minHeight: '22rem', minWidth: '22rem', paddingTop: '3rem' }}>
                        <Header as='h3' content='Image preview' />
                        <ImageUploadWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
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
            </Grid.Column>
        </Grid>
    )
})