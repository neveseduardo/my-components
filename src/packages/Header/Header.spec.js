import Header from './Header.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';
import Link from '@/packages/Link/Link.vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () => shallowMount(Header, { localVue, stubs: {
	[Link.name]: Link,
} });
beforeEach(() => (wrapper = factory()));

describe('Header', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-header', 'GHeader']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-header', () => {
		const gHeader = wrapper.find('.g-header');
		expect(gHeader.exists()).toBe(true);
	});
});
