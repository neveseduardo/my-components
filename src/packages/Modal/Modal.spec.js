import Modal from './Modal.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';
import VModal from 'vue-js-modal';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VModal, { componentName: 'VueModal' });
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Modal, {
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Modal', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-modal', 'GModal']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-modal', () => {
		const gModal = wrapper.find('.g-modal');
		expect(gModal.exists()).toBe(true);
	});
});
