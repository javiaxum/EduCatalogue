import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Dimmer, Grid, Header, List, Loader, Segment, Transition } from 'semantic-ui-react';
import NewImageUploadWidgetCropper from '../../../../app/common/imageUpload/newImage/NewImageUploadWidgetCropper';
import NewImageUploadWidgetDropzone from '../../../../app/common/imageUpload/newImage/NewImageUploadWidgetDropzone';
import { ImagesPagingParams } from '../../../../app/models/pagination';
import { useStore } from '../../../../app/stores/store';
import GalleryImage from './GalleryImage';
import { useTranslation } from 'react-i18next';

export default observer(function InstitutionDetailsGallery() {
    const { institutionStore, commonStore: { editMode } } = useStore();
    const {
        setImage,
        uploading,
        imagesPagination,
        imagesLoading,
        imagesLoadingInitial,
        setImagesPagingParams,
        images } = institutionStore;

    const { id } = useParams();
    const { t } = useTranslation();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();


    function HandleImageUpload(file: Blob) {
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
        if (!imagesPagination || imagesPagination?.currentPage! < imagesPagination?.totalPages!)
            setImagesPagingParams(new ImagesPagingParams(imagesPagination?.currentPage! + 1));
    }

    return (
        <div>
            <Transition
                visible={(imagesLoading || imagesLoadingInitial)}
                duration={500}
                transitionOnMount>
                <Dimmer inverted />
            </Transition>
            {!(images.length !== 0 || editMode || imagesLoading) &&
                <Segment basic style={{ color: '#444', width: '30rem' }}>{t('There are no images available')}...</Segment>}
            {(files && files.length > 0) &&
                <Grid style={{ width: '50rem' }}>
                    <Grid.Column style={{ width: '25rem' }}>
                        <Header as='h3' content='Image preview' />
                        <div
                            className='img-preview'
                            style={{ width: '100%', height: '15rem', maxHeight: '22rem', maxWidth: '22rem', overflow: 'hidden' }} />
                    </Grid.Column>
                    <Grid.Column style={{ width: '25rem' }}>
                        <div style={{ maxHeight: '22rem', minHeight: '22rem', maxWidth: '22rem', minWidth: '22rem' }}>
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
                    </Grid.Column>
                </Grid>}
            <InfiniteScroll
                style={{ overflow: 'hidden' }}
                dataLength={(imagesPagination?.itemsPerPage! * imagesPagination?.currentPage!) || 0}
                next={handleLoad}
                scrollThreshold={0.5}
                hasMore={!imagesLoading && !!imagesPagination
                    && imagesPagination.currentPage < imagesPagination.totalPages}
                loader={<></>}>
            </InfiniteScroll >
            <Transition.Group
                className='customTransitionContainer'
                as={List}
                duration={500}
                size='huge'
                verticalAlign='middle'
                style={{ margin: 0 }}>
                {editMode &&
                    <List.Item className='customListItem'>
                        <Segment basic style={{ width: '15rem', height: '15rem', padding: 0, display: 'inline-table' }}>
                            {(files && files.length === 0 && id) &&
                                <NewImageUploadWidgetDropzone
                                    size='15rem'
                                    setFiles={setFiles} />}
                        </Segment>
                    </List.Item>}
                {images.map((image) =>
                    <List.Item
                        className='customListItem'
                        key={image.id}
                        style={{ padding: 0 }}>
                        <GalleryImage image={image} />
                    </List.Item>)}
            </Transition.Group>
        </div >
    )
})

