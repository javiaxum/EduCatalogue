import { makeAutoObservable } from "mobx"

interface Modal {
    open: boolean;
    body: JSX.Element | null;
}

export default class ModalStore {
    modalMini: Modal = {
        open: false,
        body: null
    }
    modalFulscreen: Modal = {
        open: false,
        body: null
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModalMini = (element: JSX.Element) => {
        this.modalMini.open = true;
        this.modalMini.body = element;
    }
    openModalFullscreen = (element: JSX.Element) => {
        this.modalFulscreen.open = true;
        this.modalFulscreen.body = element;
    }
    closeModal = () => {
        this.modalFulscreen.open = false;
        this.modalFulscreen.body = null;
        this.modalMini.open = false;
        this.modalMini.body = null;
    }
}