import Link from '@/packages/Link/src/Link.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import methods from 'ot-helpers';
import ElementUI from 'element-ui';
import Icon from '@/packages/Icon/src/Icon.vue';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
localVue.use(ElementUI);

const factory = () =>
	shallowMount(Link, {
		propsData: {
			value: false,
		},
		stubs: {
			'g-icon': Icon,
		},
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Link', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-link', 'GLink']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-link', () => {
		expect(wrapper.classes()).toContain('g-link');
	});

	it('Deve estar desabilitado', async () => {
		await wrapper.setProps({ disabled: true });
		const el = wrapper.findComponent(ElementUI.Link);
		expect(el.exists()).toBe(true);
		expect(el.props().disabled).toBe(true);
	});
});
