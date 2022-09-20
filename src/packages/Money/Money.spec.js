import Money from './Money.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';
import ElementUI from 'element-ui';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
localVue.use(ElementUI);
const factory = () => shallowMount(Money, { localVue });
beforeEach(() => (wrapper = factory()));

describe('Money', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-money-input', 'GMoneyInput']).toContain(
			wrapper.vm.$options.name
		);
	});

	it('Deve conter a classe g-money', () => {
		expect(wrapper.classes()).toContain('g-money');
	});

	it('Deve renderizar o valor formatado', async () => {
		await wrapper.setProps({ value: '55.5' });
		const el = wrapper.find('input');
		// eslint-disable-next-line no-useless-escape
		expect(el.element.value).toMatch(/\+R\$\s55[\,\.]50000/);
	});

	it('Deve retornar valor float', async () => {
		await wrapper.setProps({ value: '55.5' });
		const el = wrapper.find('input');
		el.element.value = '+R$ 55,50000';
		expect(wrapper.props().value).toBe(String(55.5));
	});

	it('Deve conter a classe is_disabled', async () => {
		await wrapper.setProps({ disabled: true });
		expect(wrapper.classes()).toContain('is_disabled');
	});

	it('Deve conter a classe focus', async () => {
		await wrapper.setData({ focus: true });
		expect(wrapper.classes()).toContain('focus');
	});

	it('Deve incrementar o valor com click', async () => {
		await wrapper.setProps({ value: 55.5 });
		const up = wrapper.find('.g-money-up');
		up.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input[0][0]).toBe('55.50001');
	});

	it('Deve decrementar o valor com click', async () => {
		await wrapper.setProps({ value: 55.5 });
		const down = wrapper.find('.g-money-down');
		down.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input[0][0]).toBe('55.49999');
	});

	it('Deve estar desabilitado para ações de increment e decrement', async () => {
		await wrapper.setProps({ value: 55.5, disabled: true });
		const up = wrapper.find('.g-money-up');
		const down = wrapper.find('.g-money-down');
		up.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input).toBeFalsy();
		down.trigger('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().input).toBeFalsy();
		expect(wrapper.props().value).toBe(55.5);
	});

	it('Deve estar desabilitado para ações keyup', async () => {
		await wrapper.setProps({ disabled: true });
		const input = wrapper.find('input');
		expect(input.attributes().disabled).toBeTruthy();
	});
});
