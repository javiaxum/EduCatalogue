import { id } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';
import ImageUploadWidgetCropper from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { useStore } from '../../../app/stores/store';

export default observer(function CollageImageForm() {

    const { institutionStore } = useStore();
    const {
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

    return (
        <>
            {(files && files.length === 0) &&
                <ImageUploadWidgetDropzone
                    setFiles={setFiles}
                    imageUrl={selectedInstitution?.titleImageUrl || '/assets/placeholder.png'} />}
            {(files && files.length > 0) &&
                <Container style={{ height: '100%' }}>
                    <ImageUploadWidgetCropper
                        setCropper={setCropper}
                        imagePreview={files[0].preview} />
                    <Button.Group widths={2}>
                        <Button
                            positive
                            type='button'
                            icon='check'
                            onClick={onCrop}
                            loading={uploading}/>
                        <Button
                            onClick={() => { files.forEach((file: any) => URL.revokeObjectURL(file.preview)); setFiles([]) }}
                            type='button'
                            icon='cancel'
                            disabled={uploading}/>
                    </Button.Group>
                </Container>}
        </>
    )
})