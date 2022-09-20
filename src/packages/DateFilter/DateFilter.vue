<template>
	<div class="g-date-filter">
		<g-button
			:disabled="disabled"
			class="date-filter"
			type="primary"
			icon="date_range"
			outlined
			small
			@click="openCalendar">
			<span class="btn-text" v-show="isEmpty(mutable)">
				Filtrar por Data
			</span>
			<span class="btn-text" v-show="!isEmpty(mutable)">
				{{ dataFormatada }}
				<g-button type="link" icon="close" small @click="clearData" />
			</span>
		</g-button>
		<g-date-picker
			:range="range"
			@change="onChange"
			hidden_filter
			ref="filterDate"
			v-model="mutable"/>
	</div>
</template>

<script>
export default {
	name: 'GDateFilter',
	props: {
		value: { type: [String, Array], default: '' },
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita para eventos de click',
		},
		range: {
			type: Boolean,
			default: false,
			description: 'Habilita a seleção de duas datas',
		},
	},
	computed: {
		mutable: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			},
		},
		dataFormatada() {
			let data = this.value;
			if (Array.isArray(data)) {
				data = data.map((d) => String(d).split('-').reverse().join('/'));
				data = data.join(' à ');
				return data;
			}
			return data.split('-').reverse().join('/');
		},
	},
	methods: {
		openCalendar() {
			this.$refs.filterDate.inputFocus();
		},
		clearData() {
			this.$emit('input', '');
			this.$refs.filterDate.onChange();
		},
		onChange(value) {
			this.$emit('change', value ?? '');
		},
	},
};
</script>
