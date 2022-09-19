<template>
	<div class="g-calendar">
		<el-row type="flex" justify="space-between" class="g-calendar-header">
			<span>{{
				months[date.getMonth()] + ' ' + date.getFullYear()
			}}</span>
			<el-button-group>
				<el-button @click.prevent="prevMonth" plain>Anterior</el-button>
				<el-button @click.prevent="today" plain>Hoje</el-button>
				<el-button @click.prevent="nextMonth" plain>Próximo</el-button>
			</el-button-group>
		</el-row>
		<el-calendar @input="onInput" v-model="mutable" />
	</div>
</template>

<script>
import moment from 'moment';

export default {
	name: 'GCalendar',
	data() {
		return {
			months: [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro',
			],
			date: new Date(),
		};
	},
	props: {
		value: {
			type: Date,
			default: new Date(),
			required: true,
			description: 'Value aceita object type Date',
		},
	},
	watch: {
		value(newValue) {
			this.date = newValue;
		},
	},
	computed: {
		mutable: {
			get() {
				return this.date;
			},
			set(value) {
				this.date = this.dateToUTC(value);
			},
		},
	},
	methods: {
		nextMonth() {
			if (
				this.dateToUTC(this.mutable).getMonth() ===
				moment().toDate().getMonth()
			)
				this.today();
			this.date = moment(this.mutable).add(1, 'months').toDate();
		},
		prevMonth() {
			if (
				this.dateToUTC(this.mutable).getMonth() ===
				moment().toDate().getMonth()
			)
				this.today();
			this.date = moment(this.mutable).subtract(1, 'months').toDate();
		},
		today() {
			this.date = moment().toDate();
		},
		onInput(value) {
			this.$emit('input', this.dateToUTC(value));
		},
	},
	mounted() {
		this.date = this.dateToUTC(new Date());
	},
};
</script>
