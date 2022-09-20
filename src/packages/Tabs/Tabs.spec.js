import Tabs from './Tabs.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
const factory = () => shallowMount(Tabs, { localVue, propsData: {
	items: [],
} });
beforeEach(() => (wrapper = factory()));

describe('Tabs', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-tabs', 'GTabs']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-tabs', () => {
		expect(wrapper.find('.g-tabs').exists()).toBe(true);
	});

});