import InputTags from './InputTags.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import * as methods from 'ot-helpers';
import Input from '@/packages/Input/Input.vue';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
localVue.use(ElementUI);
const factory = () =>
	shallowMount(InputTags, {
		localVue,
		stubs: {
			[Input.name]: Input,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('InputTags', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-InputTags', 'GInputTags']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-inputtags', () => {
		const gInputTags = wrapper.find('.g-input-tags');
		expect(gInputTags.exists()).toBe(true);
	});
});
