import DateFilter from './DateFilter.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';
import Button from '@/packages/Button/Button.vue';
import DatePicker from '@/packages/DatePicker/DatePicker.vue';
import Icon from '@/packages/Icon/Icon.vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(DateFilter, { localVue, stubs: {
		[Button.name]: Button,
		[DatePicker.name]: DatePicker,
		[Icon.name]: Icon,
	} });
beforeEach(() => (wrapper = factory()));

describe('DateFilter', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-date-filter', 'GDateFilter']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-date-filter', () => {
		const gDateFilter = wrapper.find('.g-date-filter');
		expect(gDateFilter.exists()).toBe(true);
	});
});
