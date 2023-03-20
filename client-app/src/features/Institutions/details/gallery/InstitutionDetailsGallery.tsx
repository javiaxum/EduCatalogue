import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react';
import ImageUploadWidgetCropper from '../../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { useStore } from '../../../../app/stores/store';
import GalleryImage from './GalleryImage';



export default function InstitutionDetailsGallery() {
    const { institutionStore, commonStore: { editMode } } = useStore();
    const { selectedInstitution, setImage, uploading } = institutionStore;
    const { id } = useParams();

    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function HandleImageUpload(file: Blob) {
        if (id)
            setImage(file, id).then(() => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview));
                setFiles([]);
            })
    }

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => HandleImageUpload(blob!))
        }
    }

    if (!selectedInstitution || !selectedInstitution.images) return <></>;
    const filteredImages = selectedInstitution?.images.slice().filter((x) => x.id === selectedInstitution.backgroundImageId || x.id === selectedInstitution.titleImageId);

    return (
        <Grid>
            {filteredImages.length === 0
                ? <Segment style={{ color: '#444', width: '300px' }}>There are no images available...</Segment>
                : (
                    <>
                        {filteredImages.map((image) => (
                            <GalleryImage
                                image={image}
                                key={image.id} />
                        ))}
                    </>
                )}
            {editMode && <Grid.Column style={{ width: '245px' }}>
                {(files && files.length === 0) &&
                    <ImageUploadWidgetDropzone
                        setFiles={setFiles}
                        imageUrl={'/assets/placeholder.png'} />}
                {(files && files.length > 0) && <>
                    <div className='img-preview' style={{ borderRadius: '30px', minHeight: '22rem', minWidth: '22rem', overflow: 'hidden', }} />
                </>}
                {(files && files.length > 0) &&
                    <div style={{ minHeight: '22rem', minWidth: '22rem', paddingTop: '3rem' }}>
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
                    </div>}
            </Grid.Column>}
        </Grid>
    )
}