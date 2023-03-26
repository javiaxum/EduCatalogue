import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal, Transition } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function ModalImageContainer() {
    const { modalStore } = useStore();
    return (
        <Transition visible={modalStore.modalFulscreen.open} animation='scale' duration={500}>
            <Modal
                open={modalStore.modalFulscreen.open}
                onClose={modalStore.closeModal}
                style={{ width: 'fit-content', height: 'fit-content', maxWidth: '80%', maxHeight: '80%', background: 'transparent', boxShadow: 'none', display: 'flex' }}>
                <Modal.Content style={{ background: 'transparent', padding: 0 }}>
                    {modalStore.modalFulscreen.body}
                </Modal.Content>
            </Modal>
        </Transition>
    )
})