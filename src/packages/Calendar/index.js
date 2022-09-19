import Calendar from './src/Calendar.vue';
Calendar.install = function(Vue) {
	Vue.component(Calendar.name, Calendar);
};
export default Calendar;
