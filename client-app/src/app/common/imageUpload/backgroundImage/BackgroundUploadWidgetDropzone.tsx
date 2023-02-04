import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl: string;
}

export default function BackgroundUploadWidgetDropzone({ setFiles, imageUrl }: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const style = {
        border: 'dashed 3px #aaa',
        textAlign: 'center' as 'center',
        height: '230px',
        minWidth: '1200px',
        // height: 200
    }
    const activeStyle = {
        borderColor: 'green',
    }

    return (
        <div {...getRootProps()} style={isDragActive ? { ...style, ...activeStyle } : style}>
            <input {...getInputProps()} />
            <Image
                src={imageUrl}
                style={{ filter: 'brightness(30%)', objectFit: 'cover', height: '224px', minWidth: '1000px', width: '100%' }} />
            {/* <Icon name='plus' size='huge' style={{ position: 'absolute', left: '9.7rem', top: '10rem', color: '#fff' }} /> */}
            {/* <Header as='h2' inverted content='Click to choose or drag a file here' style={{ position: 'absolute', top: '12rem', left: '4.8rem', width: '15rem' }} /> */}
        </div>
    )
}