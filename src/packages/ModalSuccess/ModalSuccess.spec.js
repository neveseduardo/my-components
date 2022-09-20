import ModalSuccess from './ModalSuccess.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import VModal from 'vue-js-modal';
import Icon from '@/packages/Icon/Icon.vue';
let wrapper;
const localVue = createLocalVue();
localVue.use(VModal, { componentName: 'VueModal' });
const factory = () =>
	shallowMount(ModalSuccess, { localVue,
		propsData: {
			feedback: {},
			is_processing: false,
			modal_name: 'ModalSuccess',
			message: '',
		},
		stubs: {
			[Icon.name]: Icon,
		} });
beforeEach(() => (wrapper = factory()));

describe('ModalSuccess', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-modal-success', 'GModalSuccess']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-modal-success', () => {
		expect(wrapper.find('.g-modal-success').exists()).toBe(true);
	});
});