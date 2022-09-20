import Accordion from './Accordion.vue';
import GIcon from '@/packages/Icon/Icon.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Accordion, {
		localVue,
		stubs: {
			[GIcon.name]: GIcon,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('Accordion', () => {
	class ResizeObserver {
		observe() {}
		unobserve() {}
	}
	window.ResizeObserver = ResizeObserver;
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-accordion', 'GAccordion']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-accordion', () => {
		const gAccordion = wrapper.find('.g-accordion');
		expect(gAccordion.exists()).toBe(true);
	});
});
