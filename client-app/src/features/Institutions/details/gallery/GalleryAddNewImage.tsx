import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image as ImageSU } from 'semantic-ui-react';
import ImageUploadWidgetDropzone from '../../../../app/common/imageUpload/ImageUploadWidgetDropzone';
import { Image } from '../../../../app/models/profile';
import { Specialty } from '../../../../app/models/specialty';
import { SpecialtyCore } from '../../../../app/models/specialtyCore';

export default function GalleryAddNewImage() {

    return (
        <Grid.Column style={{ width: '245px' }}>
            <ImageUploadWidgetDropzone />
        </Grid.Column>
    )
}