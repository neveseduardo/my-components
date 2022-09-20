import SelectNested from './SelectNested.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(SelectNested, {
		propsData: {
			value: '',
		},
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('SelectNested', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-select-nested', 'GSelectNested']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-select-nested', () => {
		const gSelectNested = wrapper.find('.g-select-nested');
		expect(gSelectNested.exists()).toBe(true);
	});
});
