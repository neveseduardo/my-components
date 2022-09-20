import Input from './Input.vue';
import Icon from '@/packages/Icon/Icon.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Input, {
		localVue,
		stubs: {
			[Icon.name]: Icon,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('Input', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-input', 'GInput']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-input', () => {
		const ginput = wrapper.find('.g-input');
		expect(ginput.exists()).toBe(true);
	});
	it('Deve conter o componente el-input', () => {
		const el = wrapper.findComponent(ElementUI.Input);
		expect(el.exists()).toBe(true);
	});

	it('Deve renderizar o conteudo digitado', async () => {
		await wrapper.setProps({ value: 'testes' });
		const el = wrapper.findComponent(ElementUI.Input);
		expect(el.props().value).toBe('testes');
	});

	it('Deve limpar o conteudo ao clicar no botão de limpar', async () => {
		await wrapper.setProps({ value: 'testes' });
		const el = wrapper.findComponent(ElementUI.Input);
		expect(el.props().value).toBe('testes');
		await el.vm.$emit('clear');
		await el.vm.$emit('input', '');
		await el.vm.$emit('change', '');
		await el.vm.$nextTick();
		expect(el.emitted().clear).toBeTruthy();
		expect(el.emitted().input).toBeTruthy();
		expect(el.emitted().change).toBeTruthy();
		expect(el.emitted().input[0][0]).toBe('');
		expect(el.emitted().change[0][0]).toBe('');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input[0][0]).toBe('');
		await wrapper.setProps({ value: '' });
		expect(el.props().value).toBe('');
	});

	it('Deve renderizar por tipo', async () => {
		const el = wrapper.findComponent(ElementUI.Input);
		await wrapper.setProps({ type: 'text' });
		expect(el.props().type).toBe('text');
		await wrapper.setProps({ type: 'number' });
		expect(el.props().type).toBe('number');
		await wrapper.setProps({ type: 'email' });
		expect(el.props().type).toBe('email');
		await wrapper.setProps({ type: 'search' });
		expect(el.props().type).toBe('search');
		await wrapper.setProps({ type: 'textarea' });
		expect(el.props().type).toBe('textarea');
	});

	it('Deve renderizar o icone', async () => {
		await wrapper.setProps({ icon: 'home' });
		expect(wrapper.classes()).toContain('has_icon');
		const icon = wrapper.findComponent(Icon);
		expect(icon.exists()).toBe(true);
		expect(icon.props().name).toBe('home');
	});

	it('Deve renderizar o texto no placeholder', async () => {
		await wrapper.setProps({ placeholder: 'testes' });
		const el = wrapper.find('.g-input-placeholder');
		expect(el.exists()).toBe(true);
		expect(el.text()).toBe('testes');
	});
	// focused, focus, is_invalid, has_icon, is_disabled
	it('Deve conter classe focus', async () => {
		await wrapper.setData({ focus: true });
		expect(wrapper.classes()).toContain('focus');
		const el = wrapper.findComponent(ElementUI.Input);
		expect(el.exists()).toBe(true);
	});
});
