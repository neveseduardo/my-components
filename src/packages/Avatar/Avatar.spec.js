import Avatar from './Avatar.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

let wrapper;
const localVue = createLocalVue();
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Avatar, {
		localVue,
	});
beforeEach(() => (wrapper = factory()));

describe('Avatar', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-avatar', 'GAvatar']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-avatar', () => {
		const gAvatar = wrapper.find('.g-avatar');
		expect(gAvatar.exists()).toBe(true);
	});
});
