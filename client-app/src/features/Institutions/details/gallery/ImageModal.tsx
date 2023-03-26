import { useImageSize } from 'react-image-size';
import { Image } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';

interface Props {
    url: string
}

export default function ImageModal({ url }: Props) {
    const { modalStore } = useStore();
    const [dimensions, { loading, error }] = useImageSize(url);
    if (!(dimensions && dimensions.height && dimensions.width)) return <></>;
    return (
        <Image
            src={url || '/assets/institutionTitleImagePlaceholder.png'}
            style={{ margin: 'auto', objectFit: 'cover', width: dimensions?.height > dimensions?.width ? '' : '100%', height: dimensions?.height < dimensions?.width ? '' : '100%' }}
            onClick={() => modalStore.closeModal()} />
    )
}