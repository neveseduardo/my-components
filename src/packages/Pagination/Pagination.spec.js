import Pagination from './Pagination.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';
import Icon from '@/packages/Icon/Icon.vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () => shallowMount(Pagination, {
	propsData: {
		source: { page: 1, per_page: 20, total: 1200 },
	},
	localVue,
	stubs: {
		[Icon.name]: Icon,
	},
});
beforeEach(() => (wrapper = factory()));

describe('Pagination', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-pagination', 'GPagination']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-pagination', () => {
		const gPagination = wrapper.find('.g-pagination');
		expect(gPagination.exists()).toBe(true);
	});
});
