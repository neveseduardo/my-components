import Badge from '@/packages/Badge/src/Badge.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper;
const factory = () => shallowMount(Badge);
beforeEach(() => (wrapper = factory()));

describe('Badge', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-badge', 'GBadge']).toContain(wrapper.vm.$options.name);
	});

	it('Deve emitir evento de click quando clicado', () => {
		wrapper.find('span.g-badge').trigger('click');
		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted().click).toBeTruthy();
		});
	});

	it('As classes devem ser renderizadas por type', async () => {
		await wrapper.setProps({ type: 'error' });
		expect(wrapper.find('span.g-badge.error').exists()).toBe(true);
		await wrapper.setProps({ type: 'warning' });
		expect(wrapper.find('span.g-badge.warning').exists()).toBe(true);
		await wrapper.setProps({ type: 'success' });
		expect(wrapper.find('span.g-badge.success').exists()).toBe(true);
		await wrapper.setProps({ type: 'info' });
		expect(wrapper.find('span.g-badge.info').exists()).toBe(true);
	});
});
