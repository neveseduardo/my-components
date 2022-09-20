import Autocomplete from './Autocomplete.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Autocomplete, {
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Autocomplete', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-autocomplete', 'GAutocomplete']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-autocomplete', () => {
		const gAutocomplete = wrapper.find('.g-autocomplete');
		expect(gAutocomplete.exists()).toBe(true);
	});
});
