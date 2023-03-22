import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl?: string;
    width?: string;
    height?: string;
}

export default function NewImageUploadWidgetDropzone({ setFiles, imageUrl, width, height }: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={{ width: width, height: height }}>
            <input {...getInputProps()} />
            <Image
                avatar
                src={imageUrl || '/assets/placeholder.png'}
                style={{ filter: 'brightness(50%)', objectFit: 'cover', minHeight: height, minWidth: width, borderRadius: '30px' }} >
                <Icon name='plus' size='huge' style={{ position: 'absolute', left: '45%', top: '50%', }} />
            </Image>
        </div>
    )
}