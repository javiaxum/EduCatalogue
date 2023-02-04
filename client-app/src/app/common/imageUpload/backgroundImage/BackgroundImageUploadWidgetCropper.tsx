import React from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function BackgroundImageUploadWidgetCropper({imagePreview, setCropper}: Props) {
    return (
        <Cropper
            height={359}
            src={imagePreview}
            initialAspectRatio={8.65}
            aspectRatio={8.65}
            preview='.bkgr-img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}