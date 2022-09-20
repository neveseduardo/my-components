import Avatar from './Avatar.vue';
Avatar.install = function(Vue) {
	Vue.component(Avatar.name, Avatar);
};
export default Avatar;
