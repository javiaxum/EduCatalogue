import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Header, Icon, Image } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void;
    imageUrl: string;
}

export default function BackgroundUploadWidgetDropzone({ setFiles, imageUrl }: Props) {
    // const [hover, sethover] = useState<boolean>(false);

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const style = {
        textAlign: 'center' as 'center',
        height: '14rem',
        // height: 200
    }
    const activeStyle = {
        boxShadow: 'green',
    }

    return (
        <div {...getRootProps()} style={{ height: '13rem', minWidth: '100%', zIndex: -100 }}>
            <input {...getInputProps()} />
            <Image
                src={imageUrl}
                style={{ filter: 'brightness(50%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }}
            // style={hover ? { filter: 'brightness(30%)', objectFit: 'cover', height: '224px', minWidth: '1000px', width: '100%' } : { filter: 'brightness(40%)', objectFit: 'cover', height: '224px', minWidth: '1000px', width: '100%' }}
            // onMouseEnter={() => sethover(true)}
            // onMouseLeave={() => sethover(false)} 
            />
            <Icon name='plus' size='huge' style={{ position: 'absolute', left: 'calc(50% - 3rem)', top: '3rem', color: '#fff' }} />
            {/* <Header as='h2' inverted content='Click to choose or drag a file here' style={{ position: 'absolute', left: 'calc(50% - 15rem)', top: '5.6rem', width: '30rem' }} /> */}
        </div>
    )
}