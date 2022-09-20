import Tooltip from './Tooltip.vue';
import { shallowMount } from '@vue/test-utils';
import { Tooltip as ElTooltip } from 'element-ui';
let wrapper;
const factory = () => shallowMount(Tooltip, {
	propsData: {
		content: '',
	},
	stubs: {
		[ElTooltip.name]: ElTooltip,
	},
});
beforeEach(() => (wrapper = factory()));

describe('Tooltip', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-tooltip', 'GTooltip']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-tooltip', () => {
		expect(wrapper.find('.g-tooltip').exists()).toBe(true);
	});

});