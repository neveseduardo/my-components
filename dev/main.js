import Vue from 'vue';
import App from './App.vue';
import { Plugin as OtComponents } from '@/main.js';
import * as OTHelpers from 'ot-helpers';

Vue.use(OtComponents);
Vue.mixin({ methods: { ...OTHelpers } });
Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
}).$mount('#app');