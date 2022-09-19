import Modal from './src/Modal.vue';
import ModalDownload from './src/ModalDownload.vue';
import ModalFail from './src/ModalFail.vue';
import ModalSuccess from './src/ModalSuccess.vue';
import ModalDelete from './src/ModalDelete.vue';

Modal.install = function(Vue) {
	Vue.component(Modal.name, Modal);
};

export { Modal, ModalDownload, ModalFail, ModalSuccess, ModalDelete };
