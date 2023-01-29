import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Icon, Image } from "semantic-ui-react";

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
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '30px',
        textAlign: 'center' as 'center',
        minHeight: '22rem',
        minWidth: '22rem',
        // height: 200
    }
    const activeStyle = {
        borderColor: 'green',
        backgroundColor: '#eee'
    }

    return (
        <div {...getRootProps()} style={isDragActive ? { ...style, ...activeStyle } : style}>
            <input {...getInputProps()} />
            {
                <Image
                    avatar
                    src={imageUrl}
                    style={{ filter: 'brightness(50%)', objectFit: 'cover', minHeight: '22rem', minWidth: '22rem', borderRadius: '30px' }} />
            }
        </div>
    )
}