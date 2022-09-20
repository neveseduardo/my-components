import Progress from './Progress.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () => shallowMount(Progress, { localVue });
beforeEach(() => (wrapper = factory()));

describe('Progress', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-progress', 'GProgress']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-progress', () => {
		const gProgress = wrapper.find('.g-progress');
		expect(gProgress.exists()).toBe(true);
	});
});
