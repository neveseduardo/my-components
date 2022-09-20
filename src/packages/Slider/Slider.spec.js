import Slider from './Slider.vue';
import { Slider as ElSlider } from 'element-ui';
import { shallowMount } from '@vue/test-utils';

let wrapper;
const factory = () => shallowMount(Slider, {
	stubs: { [ElSlider.name]: ElSlider },
});
beforeEach(() => (wrapper = factory()));

describe('Slider', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-slider', 'GSlider']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-slider', () => {
		const gSlider = wrapper.find('.g-slider');
		expect(gSlider.exists()).toBe(true);
	});
});
