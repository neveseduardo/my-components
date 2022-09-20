import Spinner from './Spinner.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper;
const factory = () => shallowMount(Spinner);
beforeEach(() => (wrapper = factory()));

describe('Spinner', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-spinner', 'GSpinner']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-spinner', () => {
		const gSpinner = wrapper.find('.g-spinner');
		expect(gSpinner.exists()).toBe(true);
	});
});
