<template>
	<div class="g-switch">
		<el-switch
			@change="onChange"
			:active-text="text.active"
			:inactive-text="text.inactive"
			v-model="mutable"
			:class="{ small }"/>
	</div>
</template>

<script>
export default {
	name: 'GSwitch',
	props: {
		value: { type: Boolean, required: true },
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o botão.',
		},
		text: {
			type: Object,
			default: () => ({ active: 'Sim', inactive: 'Não' }),
			description:
				'Objeto com os textos exibidos dentro do switch, no máx 3 letras',
		},
		small: {
			type: Boolean,
			default: false,
			description: 'Versão menor do switch, sem texto',
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
	},
	methods: {
		onChange(value) {
			if (this.disabled) return;
			this.$emit('change', value);
		},
	},
};
</script>
