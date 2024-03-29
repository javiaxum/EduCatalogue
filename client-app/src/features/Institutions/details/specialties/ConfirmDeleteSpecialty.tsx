import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Button, Header, Image } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import { router } from '../../../routers/Routes';
import { useParams } from 'react-router-dom';

interface Props {
    id: string
}

export default observer(function ConfirmDeleteSpecialty({ id }: Props) {
    const { modalStore, specialtyStore } = useStore();
    const { t } = useTranslation();
    const { id1, id2 } = useParams();

    return (
        <>
            <Header content={t('Delete the specialty?')} />
            <Button.Group widths={2} fluid>
                <Button
                    negative
                    loading={specialtyStore.editing}
                    content={t('Delete')}
                    onClick={() => specialtyStore.deleteSpecialty(id).then(() => { modalStore.closeModal(); router.navigate(`/institutions/${id1}`) })} />
                <Button
                    disabled={specialtyStore.editing}
                    content={t('Cancel')}
                    onClick={() => modalStore.closeModal()} />
            </Button.Group>
        </>
    )
})