import Checkbox from './Checkbox.vue';
import ElementUI, { Checkbox as ElCheckbox } from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
const factory = () =>
	shallowMount(Checkbox, {
		stubs: {
			[ElCheckbox.name]: ElCheckbox,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('Checkbox', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-checkbox', 'GCheckbox']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-checkbox', () => {
		expect(wrapper.find('.g-checkbox').exists()).toBe(true);
	});

	it('Deve emitir evento de change quando clicado', () => {
		wrapper
			.find('.el-checkbox input.el-checkbox__original')
			.trigger('change');
		wrapper.vm.$nextTick(async () => {
			expect(wrapper.emitted().change).toBeTruthy();
			expect(wrapper.emitted().input).toBeTruthy();
			await wrapper.setProps({ value: true });
			expect(wrapper.props().value).toBe(true);
			expect(wrapper.vm.mutable).toBe(true);
		});
	});
});
