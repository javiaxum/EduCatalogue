import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal, Transition } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function ModalImageContainer() {
    const { modalStore } = useStore();
    return (
        <Transition visible={modalStore.modalFulscreen.open} animation='scale' duration={500}>
            <Modal open={modalStore.modalFulscreen.open} onClose={modalStore.closeModal} size='small'>
                <Modal.Content style={{ padding: 0 }}>
                    {modalStore.modalFulscreen.body}
                </Modal.Content>
            </Modal>
        </Transition>
    )
})