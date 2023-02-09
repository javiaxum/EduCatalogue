import { useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, DropdownProps, Grid, Header, Icon, Image, Input, Search, Segment } from 'semantic-ui-react';
import { number } from 'yup';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import ImageUploadWidgetCropper from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { InstitutionFormValues } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

interface Props {
    institution: InstitutionFormValues
}

export default observer(function InstitutionDetailsInfoForm({ institution }: Props) {
    const { institutionStore } = useStore();
    const {
        regionRegistry,
        getRegionById,
        setSelectedRegion,
        selectedRegion,
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

    const formik = useFormikContext();
    return (
        <Grid style={{ minWidth: '1000px' }}>
            <Grid.Column width={10}>
                <Grid style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='info' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Description:
                            <CustomTextArea rows={6} placeholder='Description' name='description' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon size='large' color='blue' name='graduation' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            Student count:
                            <CustomTextInput type='number' placeholder='Student count' name='studentCount' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='marker' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            Region:
                            <CustomSelectInput
                                onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                    setSelectedRegion(getRegionById(data.value as number));
                                    formik.getFieldHelpers('cityId').setValue('')
                                }}
                                placeholder={'Select region'}
                                name='regionId'
                                options={Array.from(regionRegistry.values()).map(element => ({ text: element.name, value: element.id }))} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            City:
                            <CustomSelectInput
                                placeholder={'Select city'}
                                name='cityId'
                                disabled={!!!selectedRegion}
                                options={selectedRegion?.cities.map(element => ({ text: element.name, value: element.id }))
                                    .sort((a, b) => a.text.localeCompare(b.text)) || [{ text: 'Choose city', value: 0 }]} />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            Address:
                            <CustomTextInput placeholder='Address' name='streetAddress' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='chain' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Homepage:
                            <CustomTextInput placeholder='SiteURL' name='siteURL' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='phone' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={14}>
                            Contact information:
                            <CustomTextInput placeholder='Contact Information' name='contactInformation' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
                {files && files.length == 0 && <ImageUploadWidgetDropzone
                    setFiles={setFiles}
                    imageUrl={selectedInstitution?.images.find((x) => x.id === selectedInstitution.titleImageId)?.url || '/assets/institutionTitleImagePlaceholder.png'} />}
                {files && files.length > 0 && <>
                    <div className='img-preview' style={{ borderRadius: '30px', minHeight: '22rem', minWidth: '22rem', overflow: 'hidden', }} />
                </>}
                {files && files.length > 0 &&
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