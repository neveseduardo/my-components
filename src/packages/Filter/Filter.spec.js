import Filter from './Filter.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';
import Button from '@/packages/Button/Button.vue';
import Icon from '@/packages/Icon/Icon.vue';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Filter, { localVue, stubs: {
		[Button.name]: Button,
		[Icon.name]: Icon,
	} });
beforeEach(() => (wrapper = factory()));

describe('Filter', () => {
	class IntersectionObserver {
		observe() {}
		unobserve() {}
	}
	window.IntersectionObserver = IntersectionObserver;

	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-filtro', 'GFiltro']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-filter', () => {
		const gFilter = wrapper.find('.g-filter');
		expect(gFilter.exists()).toBe(true);
	});
});
