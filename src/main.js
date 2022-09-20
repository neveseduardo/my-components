import locale from 'element-ui/lib/locale/lang/pt-br';
import ElementUI from 'element-ui';
import VModal from 'vue-js-modal';
import VTooltip from 'v-tooltip';
import { mask } from 'vue-the-mask';
import * as packages from '@/packages';

export * from './packages';
export const Plugin = {
	install: (Vue) => {
		Vue.directive('mask', (el, binding) => {
			if (!binding.value) return;
			mask(el, binding);
		});
		Vue.use(VModal, { componentName: 'VueModal' });
		Vue.use(VTooltip);
		Vue.use(ElementUI, { locale });
		Object.entries({ ...packages }).map(([, c]) => Vue.component(c.name, c));
	},
};
