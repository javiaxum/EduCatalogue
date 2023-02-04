import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl: string;
}

export default function ProfileAvatarUploadWidgetDropzone({ setFiles, imageUrl }: Props) {
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
        minHeight: '13rem',
        height: '13rem',
        minWidth: '13rem',
        width: '13rem',
    }
    const activeStyle = {
        borderColor: 'green',
    }

    return (
        <div {...getRootProps()} style={isDragActive ? { ...style, ...activeStyle } : style}>
            <input {...getInputProps()} />
            <Image
                avatar
                src={imageUrl}
                style={{ filter: 'brightness(30%)', objectFit: 'cover', minHeight: '12rem', minWidth: '12rem', borderRadius: '12rem', top: '0.25rem', left: '0.05rem', margin: '0' }} />
            <Icon name='plus' size='big' style={{ position: 'absolute', left: '6.25rem', top: '6rem', color: '#fff', margin: '0'}} />
            <Header as='h4' inverted content='Click to choose or drag a file here' style={{ position: 'absolute', top: '6rem', left: '3rem', width: '9rem' }} />
        </div>
    )
}