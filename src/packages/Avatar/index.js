import Avatar from './src/Avatar.vue';
Avatar.install = function(Vue) {
	Vue.component(Avatar.name, Avatar);
};
export default Avatar;
