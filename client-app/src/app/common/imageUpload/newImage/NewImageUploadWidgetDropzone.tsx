import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl?: string;
    size?: string;
}

export default function NewImageUploadWidgetDropzone({ setFiles, imageUrl, size }: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={{ width: size, height: size }}>
            <input {...getInputProps()} />
            <Image
                src={'/assets/placeholder.png'}
                style={{ filter: 'brightness(50%)', objectFit: 'cover', minHeight: '100%', minWidth: '100%' }} />
            <Icon name='plus' size='huge' style={{ position: 'absolute', left: 'calc(50% - 2.2rem)', top: 'calc(50% - 2.2rem)', color: '#fff' }} />
        </div>
    )
}