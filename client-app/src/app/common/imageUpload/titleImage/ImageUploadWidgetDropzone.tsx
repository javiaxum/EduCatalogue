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


    return (
        <div {...getRootProps()} style={{ height: '100%' }}>
            <input {...getInputProps()} />
            <Image
                src={imageUrl}
                style={{ objectFit: 'cover', height: '100%', filter: 'brightness(50%)' }} />
            <Icon name='plus' size='huge' style={{ position: 'relative', bottom: '55%', left: '42%', color: '#fff' }} />
            {/* <Header as='h2' inverted content='Click to choose or drag a file here' style={{ position: 'absolute', top: '12rem', left: '4.8rem', width: '15rem' }} /> */}
        </div>
    )
}