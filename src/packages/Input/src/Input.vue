<template>
	<div
		class="g-input"
		:class="{
			focused,
			focus,
			is_invalid,
			has_icon,
			is_disabled,
			textarea: type === 'textarea',
		}">
		<el-input
			ref="input"
			clearable
			:autosize="{ minRows: 4, maxRows: 6 }"
			:step="step"
			@change="$emit('change', $event)"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onBlur"
			:type="typeValue"
			:disabled="disabled"
			v-model="mutable"
			@keydown.native="$emit('keydown', $event)">
			<template v-if="has_icon && !suffix" slot="prefix">
				<g-icon
					:provide="iconObj.provide"
					:type="iconObj.type"
					:name="iconObj.name"/>
			</template>
			<template v-if="has_icon && suffix" slot="suffix">
				<g-icon
					:provide="iconObj.provide"
					:type="iconObj.type"
					:name="iconObj.name"/>
			</template>
		</el-input>
		<span class="g-input-placeholder" @click="onFocus">
			{{ placeholder }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'GInput',
	data() {
		return {
			focus: false,
			acceptedTypes: ['text', 'number', 'email', 'search', 'textarea'],
			focused: false,
		};
	},
	props: {
		value: {
			type: [Number, String],
			default: () => '',
			description: 'O valor v-model padrão',
		},
		icon: {
			type: [String, Object],
			default: '',
			description:
				'Dados do icone. Pode ser somente o nome ou um objeto.',
		},
		suffix: {
			type: Boolean,
			default: false,
			description: 'Deve renderizar o icone como suffixo',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilito o componente.',
		},
		type: {
			type: String,
			default: 'text',
			description:
				'Valores aceitáveis: text/number/email/search/textarea',
		},
		placeholder: {
			type: String,
			default: '',
			description: 'String com o valor do placeholder',
		},
		invalid: {
			type: Boolean,
			default: false,
			description: 'Determina classe is_invalid',
		},
		step: {
			type: Number,
			default: 1,
			description: 'Para input type number',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Está ocupado carregando dados',
		},
	},
	computed: {
		mutable: {
			get() {
				if (!this.focused) this.focus = !this.isEmpty(this.value);
				return this.value;
			},
			set(value) {
				if (!this.focused) this.focus = !this.isEmpty(value);
				this.$emit('input', value);
			},
		},
		has_icon() {
			return !this.isEmpty(this.icon) && this.type !== 'textarea';
		},
		is_invalid() {
			return this.invalid && !this.isEmpty(this.value);
		},
		is_disabled() {
			return this.disabled || this.loading;
		},
		typeValue() {
			if (this.acceptedTypes.includes(this.type)) return this.type;
			return 'text';
		},
		iconObj() {
			return {
				name: this.icon.name ?? this.icon,
				provide: this.icon.provide ?? 'mi',
				type: this.icon.type ?? 'outlined',
			};
		},
	},
	methods: {
		onFocus() {
			if (!this.is_disabled) {
				this.$refs.input.focus();
				this.focus = true;
			}
		},
		onBlur() {
			setTimeout(() => {
				this.$refs.input.blur();
				this.focus = !this.isEmpty(this.mutable);
			}, 100);
		},
	},
	mounted() {
		this.$watch(
			() => this.$refs?.input?.focused ?? false,
			(val) => (this.focused = val)
		);
	},
	created() {
		this.focus = Boolean(!this.isEmpty(this.value));
	},
};
</script>
