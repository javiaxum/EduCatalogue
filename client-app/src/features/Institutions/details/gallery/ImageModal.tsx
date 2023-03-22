import { Image } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';

interface Props {
    url: string
}

export default function ImageModal({ url }: Props) {
    const { modalStore } = useStore();
    return (
        <Image
            src={url || '/assets/institutionTitleImagePlaceholder.png'}
            style={{ objectFit: 'cover', height: '100%' }}
            onClick={() => modalStore.closeModal()} />
    )
}