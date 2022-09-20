import ModalFail from './ModalFail.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import VModal from 'vue-js-modal';
import Icon from '@/packages/Icon/Icon.vue';
let wrapper;
const localVue = createLocalVue();
localVue.use(VModal, { componentName: 'VueModal' });
const factory = () =>
	shallowMount(ModalFail, { localVue,
		propsData: {
			feedback: {},
			is_processing: false,
			modal_name: 'ModalFail',
		},
		stubs: {
			[Icon.name]: Icon,
		} });
beforeEach(() => (wrapper = factory()));

describe('ModalFail', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-modal-fail', 'GModalFail']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-modal-fail', () => {
		expect(wrapper.find('.g-modal-fail').exists()).toBe(true);
	});
});