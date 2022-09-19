<template>
	<div class="g-slider">
		<el-slider
			@change="onChange"
			:marks="sliderMarks"
			:min="min"
			:max="max"
			:setp="step"
			:range="range"
			:disabled="disabled"
			v-model="mutable"/>
	</div>
</template>

<script>
export default {
	name: 'GSlider',
	props: {
		value: { type: [Array, Number], default: 0 },
		min: {
			type: Number,
			default: 0,
			description: 'Valor inicial do range',
		},
		max: {
			type: Number,
			default: 100,
			description: 'Valor final do range',
		},
		step: {
			type: Number,
			default: 0,
			description: 'Passo a passo do contador.',
		},
		range: {
			type: Boolean,
			default: false,
			description: 'Define um range dentro do range principal.',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o componente.',
		},
		showMarks: {
			type: Boolean,
			default: false,
			description: 'Mostra as marcações de valores.',
		},
		marks: {
			type: Object,
			default: () => {
				return {
					0: '0',
					10: '10',
					20: '20',
					30: '30',
					40: '40',
					50: '50',
					60: '60',
					70: '70',
					80: '80',
					90: '90',
					100: '100',
				};
			},
		},
	},
	computed: {
		mutable: {
			get() {
				return this.value;
			},
			set(value) {
				if (this.disabled) return;
				this.$emit('input', value);
			},
		},
		sliderMarks() {
			if (this.showMarks) {
				return this.marks;
			}
			return {};
		},
	},
	methods: {
		onChange(event) {
			this.$emit('change', event);
		},
	},
};
</script>
