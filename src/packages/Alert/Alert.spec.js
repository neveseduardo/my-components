import Alert from './Alert.vue';
import { Alert as ElAlert } from 'element-ui';
import { shallowMount } from '@vue/test-utils';

let wrapper;
const factory = () =>
	shallowMount(Alert, {
		stubs: {
			[ElAlert.name]: ElAlert,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('Alert', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-alert', 'GAlert']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-alert', () => {
		expect(wrapper.find('.g-alert').exists()).toBe(true);
		expect(wrapper.find('.el-alert').exists()).toBe(true);
	});

	it('O titulo deve ser renderizado', async () => {
		await wrapper.setProps({ title: 'Olá testes' });
		expect(wrapper.props().title).toEqual('Olá testes');
		expect(wrapper.find('.el-alert__title').text()).toEqual('Olá testes');
	});

	it('As classes devem ser renderizadas por type', async () => {
		await wrapper.setProps({ type: 'error' });
		expect(wrapper.find('.el-alert--error').exists()).toBe(true);
		await wrapper.setProps({ type: 'warning' });
		expect(wrapper.find('.el-alert--warning').exists()).toBe(true);
		await wrapper.setProps({ type: 'success' });
		expect(wrapper.find('.el-alert--success').exists()).toBe(true);
		await wrapper.setProps({ type: 'info' });
		expect(wrapper.find('.el-alert--info').exists()).toBe(true);
	});
});
