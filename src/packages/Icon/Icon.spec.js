import Icon from './Icon.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper;
const factory = () => shallowMount(Icon, { propsData: {
	name: 'home',
} });
beforeEach(() => (wrapper = factory()));

describe('Icon', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-icon', 'GIcon']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-icon', () => {
		expect(wrapper.find('.g-icon').exists()).toBe(true);
	});
});