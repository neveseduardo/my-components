import Switch from '@/packages/Switch/src/Switch.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import methods from 'ot-helpers';
import ElementUI from 'element-ui';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
localVue.use(ElementUI);

const factory = () =>
	shallowMount(Switch, {
		propsData: {
			value: false,
		},
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Switch', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-switch', 'GSwitch']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-switch', () => {
		expect(wrapper.classes()).toContain('g-switch');
	});

	it('Deve emitir evento change', async () => {
		const el = await wrapper.findComponent(ElementUI.Switch);
		expect(el.exists()).toBe(true);
		el.vm.$emit('change', true);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().change).toBeTruthy();
	});

	it('Não deve emitir evento change se desabilitado', async () => {
		await wrapper.setProps({ disabled: true });
		const el = await wrapper.findComponent(ElementUI.Switch);
		expect(el.exists()).toBe(true);
		el.vm.$emit('change', true);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().change).toBeFalsy();
	});

	it('Deve conter a classe small', async () => {
		await wrapper.setProps({ small: true });
		const el = await wrapper.findComponent(ElementUI.Switch);
		expect(el.classes()).toContain('small');
	});
});
