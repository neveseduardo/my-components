import ModalDownload from './ModalDownload.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Spinner from '@/packages/Spinner/Spinner.vue';
import Modal from '@/packages/Modal/Modal.vue';
import VModal from 'vue-js-modal';

let wrapper;
const localVue = createLocalVue();
localVue.use(VModal, { componentName: 'VueModal' });
const factory = () =>
	shallowMount(ModalDownload, { localVue,
		propsData: {
			feedback: {},
		},
		stubs: {
			[Spinner.name]: Spinner,
			[Modal.name]: Modal,
		} });
beforeEach(() => (wrapper = factory()));

describe('ModalDownload', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-modal-download', 'GModalDownload']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-modal-download', () => {
		expect(wrapper.find('.g-modal-download').exists()).toBe(true);
	});
});