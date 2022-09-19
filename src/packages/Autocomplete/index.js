import Autocomplete from './src/Autocomplete.vue';
Autocomplete.install = function(Vue) {
	Vue.component(Autocomplete.name, Autocomplete);
};
export default Autocomplete;
