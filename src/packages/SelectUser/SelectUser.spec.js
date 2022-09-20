import SelectUser from './SelectUser.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(SelectUser, {
		propsData: {
			value: '',
		},
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('SelectUser', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-select-user', 'GSelectUser']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-select-user', () => {
		const gSelectUser = wrapper.find('.g-select-user');
		expect(gSelectUser.exists()).toBe(true);
	});
});
