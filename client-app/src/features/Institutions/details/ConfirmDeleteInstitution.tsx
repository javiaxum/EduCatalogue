import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Button, Header, Image } from 'semantic-ui-react';

import { useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { router } from '../../routers/Routes';

interface Props {
    id: string
}

export default observer(function ConfirmDeleteInstitution({ id }: Props) {
    const { modalStore, institutionStore } = useStore();
    const { t } = useTranslation();
    const { id1, id2 } = useParams();

    return (
        <>
            <Header content={t('Delete the institution?')} />
            <Button.Group widths={2} fluid>
                <Button
                    negative
                    loading={institutionStore.uploading}
                    content={t('Delete')}
                    onClick={() => institutionStore.deleteInstitution(id).then(() => {modalStore.closeModal(); router.navigate(`/institutions`)})} />
                <Button
                    disabled={institutionStore.uploading}
                    content={t('Cancel')}
                    onClick={() => modalStore.closeModal()} />
            </Button.Group>
        </>
    )
})