import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import GalleryAddNewImage from './GalleryAddNewImage';
import GalleryImage from './GalleryImage';



export default function InstitutionDetailsGallery() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString } = specialtyStore;
    const { selectedInstitution, specialtyPredicate, branchPredicate } = institutionStore;
    const { editMode } = commonStore;

    if (!selectedInstitution || !selectedInstitution.images) return <></>;
    const filteredImages = selectedInstitution?.images.slice().filter((x) => x.id === selectedInstitution.backgroundImageId || x.id === selectedInstitution.titleImageId);

    return (
        <Grid >
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
            {editMode && <GalleryAddNewImage />
            }
        </Grid>
    )
}