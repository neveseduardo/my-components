import ModalDelete from './ModalDelete.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import VModal from 'vue-js-modal';
import Button from '@/packages/Button/Button.vue';
import Icon from '@/packages/Icon/Icon.vue';
import Modal from '@/packages/Modal/Modal.vue';
import * as OTHelpers from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(VModal, { componentName: 'VueModal' });
localVue.mixin({ methods: { ...OTHelpers } });
const factory = () =>
	shallowMount(ModalDelete, { localVue,
		propsData: {
			feedback: {},
			is_processing: false,
		},
		stubs: {
			[Button.name]: Button,
			[Icon.name]: Icon,
			[Modal.name]: Modal,
		} });
beforeEach(() => (wrapper = factory()));

describe('ModalDelete', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-modal-delete', 'GModalDelete']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-modal-delete', () => {
		expect(wrapper.find('.g-modal-delete').exists()).toBe(true);
	});
});