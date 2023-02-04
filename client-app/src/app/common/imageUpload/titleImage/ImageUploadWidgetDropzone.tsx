import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl: string;
}

export default function ImageUploadWidgetDropzone({ setFiles, imageUrl }: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const style = {
        border: 'dashed 3px #aaa',
        borderRadius: '30px',
        textAlign: 'center' as 'center',
        minHeight: '22rem',
        minWidth: '22.4rem',
        // height: 200
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
                style={{ filter: 'brightness(30%)', objectFit: 'cover', minHeight: '22rem', minWidth: '22rem', borderRadius: '30px' }} />
            <Icon name='plus' size='huge' style={{ position: 'absolute', left: '9.7rem', top: '10rem', color: '#fff' }} />
            <Header as='h2' inverted content='Click to choose or drag a file here' style={{ position: 'absolute', top: '12rem', left: '4.8rem', width: '15rem' }} />
        </div>
    )
}