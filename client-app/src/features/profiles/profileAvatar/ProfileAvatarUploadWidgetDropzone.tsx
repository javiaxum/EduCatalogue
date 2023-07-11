import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl: string;
    imageSize?: string;
}

export default function ProfileAvatarUploadWidgetDropzone({ setFiles, imageUrl, imageSize }: Props) {
    const localImageSize = imageSize ? imageSize : '12rem';
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const style = {
        border: 'dashed 3px #aaa',
        borderRadius: '22rem',
        textAlign: 'center' as 'center',
        minHeight: localImageSize,
        height: localImageSize,
        minWidth: localImageSize,
        width: localImageSize,
        margin: '0 auto',
    }
    const activeStyle = {
        borderColor: 'green',
    }

    return (
        <div {...getRootProps()} style={isDragActive ? { ...style, ...activeStyle } : style}>
            <input {...getInputProps()} />
            <Image
                avatar
                src={imageUrl || '/assets/placeholder.png'}
                style={{ filter: 'brightness(50%)', objectFit: 'cover', minHeight: '100%', minWidth: '100%' }} />
            <Icon name='plus' size='huge' style={{ position: 'absolute', left: 'calc(50% - 2.35rem)', top: 'calc(50% - 2.2rem)', color: '#fff' }} />
        </div>
    )
}