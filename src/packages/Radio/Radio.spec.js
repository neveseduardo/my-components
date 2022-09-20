import Radio from './Radio.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () => shallowMount(Radio, {
	localVue,
	propsData: {
		label: 'Radio',
		value: false,
	},
});
beforeEach(() => (wrapper = factory()));

describe('Radio', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-radio', 'GRadio']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-radio', () => {
		const gRadio = wrapper.find('.g-radio');
		expect(gRadio.exists()).toBe(true);
	});
});
