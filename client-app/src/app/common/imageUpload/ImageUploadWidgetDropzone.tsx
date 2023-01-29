import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Icon } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
}

export default function ImageUploadWidgetDropzone({ setFiles }: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const style = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }
    const activeStyle = {
        borderColor: 'green'
    }

    return (
        <div {...getRootProps()} style={isDragActive ? { ...style, ...activeStyle } : style}>
            <input {...getInputProps()} />
            {
                <Button
                    fluid
                    style={{ color: '#999', alignItems: 'center', display: 'flex' }}
                    className='specialtyCard'
                    type='button'
                >
                    <Icon name='plus' size='large' style={{ width: '100%' }} />
                </Button>
            }
        </div>
    )
}