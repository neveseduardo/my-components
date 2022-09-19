<template>
	<div class="g-radio" :class="[{ is_invalid: invalid }]">
		<el-radio
			:border="border"
			:disabled="disabled"
			v-model="mutable"
			:label="label">
			<slot />
		</el-radio>
	</div>
</template>

<script>
export default {
	name: 'GRadio',
	props: {
		value: { required: true, type: [String, Boolean], default: false },
		label: {
			required: true,
			type: String,
			default: '',
			description: 'Label do input',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o componente.',
		},
		invalid: {
			type: Boolean,
			default: false,
			description: 'Classe de erro.',
		},
		border: {
			type: Boolean,
			default: true,
			description: 'Estilo com borda.',
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
			if (this.disabled) return;
			this.$emit('change', value);
		},
	},
};
</script>
