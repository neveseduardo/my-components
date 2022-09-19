import Accordion from './src/Accordion.vue';
Accordion.install = function(Vue) {
	Vue.component(Accordion.name, Accordion);
};
export default Accordion;
