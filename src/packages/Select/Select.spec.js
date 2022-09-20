import Select from './Select.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Select, {
		propsData: {
			value: '',
		},
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Select', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-select', 'GSelect']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-select', () => {
		const gSelect = wrapper.find('.g-select');
		expect(gSelect.exists()).toBe(true);
	});
});
