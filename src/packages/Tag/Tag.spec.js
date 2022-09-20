import Tag from './Tag.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as OTHelpers from 'ot-helpers';
import { Tag as ElTag } from 'element-ui';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods: { ...OTHelpers } });
const factory = () => shallowMount(Tag, { localVue, stubs: {
	[ElTag.name]: ElTag,
} });
beforeEach(() => (wrapper = factory()));

describe('Tag', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-tag', 'GTag']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-tag', () => {
		expect(wrapper.find('.g-tag').exists()).toBe(true);
	});

});