import Calendar from './Calendar.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Calendar, {
		propsData: {
			value: '',
		},
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Calendar', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-calendar', 'GCalendar']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-calendar', () => {
		const gCalendar = wrapper.find('.g-calendar');
		expect(gCalendar.exists()).toBe(true);
	});
});
