<template>
	<div class="g-progress">
		<el-progress
			:type="type"
			:percentage="percentage"
			:color="colors"
			:stroke-width="strokeWidth"></el-progress>
	</div>
</template>

<script>
export default {
	name: 'GProgress',
	props: {
		percentage: {
			type: Number,
			default: 0,
			description: 'Valor em percentual do progresso.', // 0-100
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o componente.',
		},
		type: {
			type: String,
			default: 'line',
			description: 'line/circle/dashboard',
		},
		status: {
			type: String,
			default: '',
			description: 'success/exception/warning',
		},
		strokeWidth: {
			type: Number,
			default: 5,
			description: 'Altura da barra',
		},
		colors: {
			type: Array,
			default: () => {
				return [
					{ color: '#f56c6c', percentage: 20 },
					{ color: '#e6a23c', percentage: 40 },
					{ color: '#5cb87a', percentage: 60 },
					{ color: '#1989fa', percentage: 80 },
					{ color: '#6f7ad3', percentage: 100 },
				];
			},
			description: 'Cores padrão para cada status.',
		},
	},
	methods: {
		onChange(event) {
			this.$emit('change', event);
		},
	},
};
</script>
