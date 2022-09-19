import Button from '@/packages/Button/src/Button.vue';
import Icon from '@/packages/Icon/src/Icon.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Button, {
		localVue,
		stubs: {
			'g-icon': Icon,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('Button', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-button', 'GButton']).toContain(wrapper.vm.$options.name);
	});

	it('Deve emitir evento de click quando clicado', () => {
		wrapper.find('button').trigger('click');
		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted().click).toBeTruthy();
		});
	});

	it('Não deve emitir um evento quando desabilitado', async () => {
		await wrapper.setProps({ disabled: true });
		wrapper.find('button').trigger('click');
		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted().click).toBeFalsy();
		});
	});

	it('Show/Hide Ícone de loading', async () => {
		await wrapper.setProps({ loading: true });
		expect(wrapper.find('.icon.loading').isVisible()).toBe(true);
		await wrapper.setProps({ loading: false });
		expect(wrapper.find('.icon.loading').isVisible()).toBe(false);
	});

	it('Renderizou icone', async () => {
		await wrapper.setProps({ icon: 'search' });
		expect(wrapper.find('.icon.prefix').isVisible()).toBe(true);
		expect(
			wrapper
				.find('.icon.prefix .g-icon.material-icons-outlined')
				.exists()
		).toBe(true);
		expect(
			wrapper.find('.icon.prefix .g-icon.material-icons-outlined').text()
		).toBe('search');
	});

	it('Renderizou ícone com objeto', async () => {
		await wrapper.setProps({
			icon: { provide: 'mi', name: 'home', type: 'outlined' },
		});
		expect(wrapper.find('.icon.prefix').isVisible()).toBe(true);
		expect(
			wrapper
				.find('.icon.prefix .g-icon.material-icons-outlined')
				.exists()
		).toBe(true);
	});

	it('Renderizou icone suffix', async () => {
		await wrapper.setProps({ icon: 'search', suffix: true });
		expect(wrapper.find('.icon.prefix').isVisible()).toBe(false);
		expect(wrapper.find('.icon.suffix').isVisible()).toBe(true);
		expect(
			wrapper
				.find('.icon.suffix .g-icon.material-icons-outlined')
				.exists()
		).toBe(true);
		expect(
			wrapper.find('.icon.suffix .g-icon.material-icons-outlined').text()
		).toBe('search');
	});

	it('Deve conter a classe g-button', () => {
		const el = wrapper.find('button');
		expect(el.classes()).toContain('g-button');
	});

	it('Toggle classe disabled', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ disabled: true });
		expect(el.classes()).toContain('is-disabled');
		await wrapper.setProps({ disabled: false });
		expect(el.classes()).not.toContain('is-disabled');
	});

	it('Toggle classe rounded', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ rounded: true });
		expect(el.classes()).toContain('rounded');
		await wrapper.setProps({ rounded: false });
		expect(el.classes()).not.toContain('rounded');
	});

	it('Toggle classe circle', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ circle: true });
		expect(el.classes()).toContain('circle');
	});

	it('Toggle classe small', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ small: true });
		expect(el.classes()).toContain('small');
		await wrapper.setProps({ small: false });
		expect(el.classes()).not.toContain('small');
	});

	it('Toggle classe solid', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ solid: true });
		expect(el.classes()).toContain('solid');
		await wrapper.setProps({ solid: false });
		expect(el.classes()).not.toContain('solid');
	});

	it('Toggle classe primary', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ type: 'primary' });
		expect(el.classes()).toContain('primary');
		await wrapper.setProps({ type: '' });
		expect(el.classes()).not.toContain('primary');
	});

	it('Toggle classe sucess', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ type: 'sucess' });
		expect(el.classes()).toContain('sucess');
		await wrapper.setProps({ type: '' });
		expect(el.classes()).not.toContain('sucess');
	});

	it('Toggle classe warning', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ type: 'warning' });
		expect(el.classes()).toContain('warning');
		await wrapper.setProps({ type: '' });
		expect(el.classes()).not.toContain('warning');
	});

	it('Toggle classe danger', async () => {
		const el = wrapper.find('button');
		await wrapper.setProps({ type: 'danger' });
		expect(el.classes()).toContain('danger');
		await wrapper.setProps({ type: '' });
		expect(el.classes()).not.toContain('danger');
	});
});
