import DatePicker from './DatePicker.vue';
import ElementUI, { DatePicker as Picker, Input } from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(DatePicker, {
		localVue,
		stubs: { [Picker.name]: Picker },
	});
beforeEach(() => (wrapper = factory()));

describe('DatePicker', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-date-picker', 'GDatePicker']).toContain(
			wrapper.vm.$options.name
		);
	});

	it('Deve conter a classe g-date-picker', () => {
		const el = wrapper.find('.g-date-picker');
		expect(el.exists()).toBe(true);
	});

	it('Deve renderizar o placeholder', async () => {
		await wrapper.setProps({ placeholder: 'Placeholder testes' });
		expect(wrapper.props().placeholder).toBe('Placeholder testes');
		expect(wrapper.find('.datepicker-placeholder').exists()).toBe(true);
		expect(wrapper.find('.datepicker-placeholder').text()).toBe(
			'Placeholder testes'
		);
	});

	it('Deve renderizar a data passada para o componente', async () => {
		await wrapper.setProps({ value: '2020-01-01' });
		const input = wrapper.findComponent({ ref: 'input' });
		expect(input.exists()).toBe(true);
		expect(input.vm.$children[0].$options.propsData.value).toBe(
			'01/01/2020'
		);
	});
});
