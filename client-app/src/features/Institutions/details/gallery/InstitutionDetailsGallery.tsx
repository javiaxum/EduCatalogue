import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Grid, Header, List, Loader, Segment, Transition } from 'semantic-ui-react';
import NewImageUploadWidgetCropper from '../../../../app/common/imageUpload/newImage/NewImageUploadWidgetCropper';
import NewImageUploadWidgetDropzone from '../../../../app/common/imageUpload/newImage/NewImageUploadWidgetDropzone';
import ImageUploadWidgetCropper from '../../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { ImagesPagingParams } from '../../../../app/models/pagination';
import { useStore } from '../../../../app/stores/store';
import GalleryImage from './GalleryImage';



export default observer(function InstitutionDetailsGallery() {
    const { institutionStore, commonStore: { editMode } } = useStore();
    const {
        selectedInstitution,
        setImage,
        uploading,
        selectedInstitutionImages,
        imagesPagination,
        imagesLoading,
        setImagesPagingParams,
        images } = institutionStore;
    const { id } = useParams();

    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function HandleImageUpload(file: Blob) {
        console.log(file.size);
        if (id && file.size <= 10485760)
            setImage(file, id).then(() => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview));
                setFiles([]);
            })
        else if (file.size > 10485760) {
            toast.error("Image size is too large");
        }
    }

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => HandleImageUpload(blob!))
        }
    }

    function handleLoad() {
        console.log(imagesPagination)
        if (!imagesPagination || imagesPagination?.currentPage! < imagesPagination?.totalPages!)
            setImagesPagingParams(new ImagesPagingParams(imagesPagination?.currentPage! + 1));
    }

    if (!selectedInstitution) return <></>;

    return (
        <div style={{ textAlign: 'center' }}>
            {(images.length === 0 && !editMode) && <Segment style={{ color: '#444', width: '30rem' }}>There are no images available...</Segment>}
            <InfiniteScroll
                style={{ overflow: 'hidden' }}
                dataLength={(imagesPagination?.itemsPerPage! * imagesPagination?.currentPage!) || 0}
                next={handleLoad}
                hasMore={!imagesLoading && !!imagesPagination
                    && imagesPagination.currentPage < imagesPagination.totalPages}
                loader={
                    <Transition
                        visible={imagesLoading}
                        duration={500}
                        size='huge'
                        verticalAlign='middle'>
                        <Loader inline active={true} size='small' style={{ marginLeft: '20rem', zIndex: 100 }} />
                    </Transition>}>
            </InfiniteScroll>
            {images.map((image) => (
                <GalleryImage
                    image={image}
                    key={image.id} />))}
            {editMode &&
                <Grid.Column style={{ width: '245px' }}>
                    {(files && files.length === 0) &&
                        <NewImageUploadWidgetDropzone
                            width='16rem'
                            height='16rem'
                            setFiles={setFiles} />}
                    {(files && files.length > 0) && <>
                        <div
                            className='img-preview'
                            style={{ borderRadius: '30px', minHeight: '22rem', minWidth: '22rem', overflow: 'hidden', }} />
                        <div style={{ minHeight: '22rem', minWidth: '22rem', paddingTop: '3rem' }}>
                            <Header as='h3' content='Image preview' />
                            <NewImageUploadWidgetCropper
                                setCropper={setCropper}
                                imagePreview={files[0].preview} />
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
                        </div>
                    </>}
                </Grid.Column>}
        </div>
    )
})

