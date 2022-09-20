import Table from './Table.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper;
const factory = () => shallowMount(Table, { propsData: {
	loading_data: false,
	data_length: 20,
	table_th: [],
} });
beforeEach(() => (wrapper = factory()));

describe('Table', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-listagem', 'GListagem']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-listagem', () => {
		expect(wrapper.find('.g-listagem').exists()).toBe(true);
	});

});