import React from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function ImageUploadWidgetCropper({imagePreview, setCropper}: Props) {
    return (
        <Cropper
        style={{maxHeight: '30.6rem'}}
            src={imagePreview}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}