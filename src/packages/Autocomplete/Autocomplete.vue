<template>
	<div
		class="g-autocomplete"
		:class="{
			focused,
			focus,
			isInvalid,
			hasIcon,
			isDisabled
		}">
		<el-autocomplete
			ref="input"
			clearable
			:autosize="{ minRows: 4, maxRows: 6}"
			:placeholder="placeholderValue"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			@select="$emit('select',$event)"
			:disabled="disabled"
			v-model="mutable"
			:fetch-suggestions="fetchSuggestions"
			:value-key="valueKey"
			:trigger-on-focus="false"
			:debounce="delay_typing">
			<template v-if="hasIcon" slot="prefix">
				<g-icon :name="icon"/>
			</template>
		</el-autocomplete>
		<span @click="$refs.input.focus()">{{ placeholder }}</span>
	</div>
</template>

<script>
export default {
	name: 'GAutocomplete',
	data: () => ({
		focus: false,
		focused: false,
		acceptedTypes: ['text', 'number', 'email', 'search', 'textarea'],
	}),
	props: {
		value: {
			type: String,
			default: '',
			description: 'O valor v-model padrão',
		},
		icon: {
			type: String,
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
		placeholder: {
			type: String,
			default: '',
			description: 'String com o valor do placeholder',
		},
		invalid: {
			type: Boolean,
			default: false,
			description: 'Determina classe isInvalid',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Está ocupado carregando dados',
		},
		valueKey: {
			type: String,
			default: '',
			description: 'Nome da chave a ser exibida',
		},
		fetchSuggestions: {
			type: Function,
			default: () => ({}),
			description: 'Método para buscar as sugestões',
		},
		delay_typing: {
			type: Number,
			default: 600,
			description: 'Tempo de delay para buscar as sugestões',
		},
	},
	computed: {
		mutable: {
			get: function() {
				if (!this.focused)
					this.focus = !this.isEmpty(this.value);
				return this.value;
			},
			set: function(value) {
				this.$emit('input', value);
			},
		},
		error() {
			return false;
		},
		placeholderValue() {
			if (this.type === 'textarea' && this.focus) return this.placeholder;
			return '';
		},
		hasIcon() {
			return this.icon !== '' && this.type !== 'textarea';
		},
		isInvalid() {
			return this.invalid && this.value !== '';
		},
		isDisabled() {
			return this.disabled || this.loading;
		},
	},
	methods: {
		onFocus() {
			if (!this.isDisabled) {
				if (this.$refs.input)
					this.$refs.input.focus();
				this.$emit('focus');
				this.focus = true;
			}
		},
		onBlur() {
			setTimeout(() => {
				this.$refs.input.$children[0].blur();
				this.$emit('blur');
				this.focus = !this.isEmpty(this.mutable);
			}, 100);
		},
		onClear() {
			this.onBlur();
			this.$emit('clear');
		},
	},
	mounted() {
		this.$watch(() => this.$refs?.input?.$children[0]?.focused ?? false, val => this.focused = val);
		this.focus = !this.isEmpty(this.value);
	},
};
</script>
