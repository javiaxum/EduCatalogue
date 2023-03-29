import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image as ImageSU, Segment } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';
import { Image } from '../../../../app/models/image';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';
import ImageModal from './ImageModal';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';


interface Props {
    image: Image;
}

export default observer(function GalleryImage({ image }: Props) {
    const { commonStore: { editMode }, modalStore, institutionStore } = useStore();
    const { uploading, deleteInstitutionImage, selectedInstitution, setImageStatus } = institutionStore;

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    const [target, setTarget] = useState('');
    return (
        <div style={{ height: isComputerOrTablet ? '15rem' : '', maxWidth: isComputerOrTablet ? '30rem' : '100%', width: isComputerOrTablet ? '100%' : '', display: 'inline-block', padding: '0 0.2rem 0 0.2rem', overflow: 'hidden' }}>
            <ImageSU
                src={image.url || '/assets/institutionTitleImagePlaceholder.png'}
                style={{ objectFit: 'cover', height: '100%', filter: editMode ? 'brightness(50%)' : 'none', boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)' }}
                onClick={() => (!editMode && isComputerOrTablet) && modalStore.openModalFullscreen(<ImageModal url={image.url} />)} >
            </ImageSU>
            {editMode &&
                <Button
                    key={image.id}
                    type='button'
                    className='image-crud-button'
                    basic
                    disabled={uploading}
                    loading={target === image.id && uploading}
                    onClick={() => { setTarget(image.id); deleteInstitutionImage(image.id, selectedInstitution?.id!).then(() => setTarget('')) }}
                    style={{ position: 'relative', bottom: '15rem', left: '-0.5rem', boxShadow: 'none' }}>
                    {!(target === image.id && uploading) && <Icon name='x' style={{ color: '#aaa' }} size='large' />}
                </Button>
            }
        </div>
    )
})