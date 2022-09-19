<template>
	<div class="g-checkbox" :class="[{ is_invalid: invalid }]">
		<el-checkbox
			:checked="checked"
			@change="onChange"
			:border="border"
			:disabled="disabled"
			v-model="mutable">
			<slot />
		</el-checkbox>
	</div>
</template>

<script>
export default {
	name: 'GCheckbox',
	props: {
		value: {
			type: Boolean,
			default: false,
			description: 'Valor true/false',
		},
		checked: {
			type: Boolean,
			default: false,
			description: 'O checkbox está checkado',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita para eventos de click',
		},
		invalid: {
			type: Boolean,
			default: false,
			description: 'Classe de erro',
		},
		border: {
			type: Boolean,
			default: true,
			description: 'Estilo com borda',
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
	},
	methods: {
		onChange(value) {
			this.$emit('change', value);
		},
	},
};
</script>
