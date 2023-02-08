import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Image as ImageSU } from 'semantic-ui-react';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';
import { Image } from '../../../../app/models/image';


interface Props {
    image: Image;
}

export default function GalleryImage({ image }: Props) {

    return (
        <Grid.Column style={{ width: '245px' }}>
            <ImageSU
                src={image.url || '/assets/institutionTitleImagePlaceholder.png'}
                style={{ objectFit: 'cover' }}
            />
        </Grid.Column>
    )
}