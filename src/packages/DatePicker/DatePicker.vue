<template>
	<div
		class="g-date-picker"
		:class="[
			{
				focused,
				focus,
				empty,
				is_invalid: is_invalid,
				is_disabled: disabled,
				hidden: hidden_filter,
			},
		]">
		<el-date-picker
			ref="input"
			:type="
				typeof type === 'string' ? type : range ? 'daterange' : 'date'
			"
			@focus="onFocus"
			@blur="onBlur"
			@change="onChange"
			:picker-options="picker_options"
			:format="format"
			:value-format="outputFormat"
			start-placeholder=""
			end-placeholder=""
			range-separator="à"
			prefix-icon="clear"
			v-model="mutable"
			:disabled="disabled"
			v-mask="type !== 'date' ? false : '##/##/####'"/>
		<span
			@click="$refs.input.focus()"
			class="material-icons-outlined datepicker-icon">
			calendar_today
		</span>
		<span @click="inputFocus" class="datepicker-placeholder">{{
			placeholder
		}}</span>
	</div>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
	name: 'GDatePicker',
	data: () => ({
		focus: false,
		focused: false,
	}),
	props: {
		value: { default: '' },
		disabled: { type: Boolean, default: false },
		range: { type: Boolean, default: false },
		type: { type: String, default: null },
		invalid: { type: Boolean, default: false },
		placeholder: { type: String, default: 'Selecione uma data' },
		hidden_filter: { type: Boolean, default: false },
		picker_options: { type: Object, default: () => {} },
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
		is_invalid() {
			return this.invalid && this.isEmpty(this.value);
		},
		empty() {
			const { value: v } = this;
			if (v === null || v === undefined || v === '') return true;
			return false;
		},
		format() {
			const type = this.type;
			if (type === 'year') return 'yyyy';
			if (type === 'month') return 'MMMM \'de\' yyyy';
			if (type === 'day') return 'dd';
			return 'dd/MM/yyyy';
		},
		outputFormat() {
			const type = this.type;
			if (type === 'year') return 'yyyy';
			if (type === 'month') return 'yyyy-MM';
			if (type === 'day') return 'dd';
			return 'yyyy-MM-dd';
		},
	},
	methods: {
		formatDate(date) {
			if (this.isEmpty(date)) {
				return '';
			}
			return date.split('/').reverse().join('-');
		},
		inputFocus() {
			if (this.disabled) return;
			this.$refs.input.focus();
			this.focus = true;
		},
		onFocus(event) {
			this.focused = true;
			this.$emit('focus', this.mutable);
		},
		onBlur() {
			setTimeout(() => {
				if (this.focus) {
					this.$refs.input.blur();
				}
				this.focused = false;
				this.focus =
					!this.isEmpty(this.mutable) || this.type === 'date' ?
						true :
						false;
			}, 100);
		},
		onChange(value) {
			this.$emit('change', value);
			if (this.isEmpty(value)) {
				this.focus = false;
			}
		},
		mask(v) {
			v = v.replace(/\D/g, '');
			v = v.replace(/(\d{2})(\d)/, '$1/$2');
			v = v.replace(/(\d{2})(\d)/, '$1/$2');
			v = v.replace(/(\d{2})(\d{2})$/, '$1$2');
			v = v.slice(0, 10);
			return v;
		},
	},
	directives: {
		mask: {
			mask: (el, binding) => {
				if (!binding.value) return;
				mask(el, binding);
			},
		},
	},
	mounted() {
		const el = document.querySelectorAll(
			'.g-date-picker .el-date-editor.el-range-editor input'
		);
		Array.from(el).map((item) => {
			item.addEventListener(
				'keydown',
				(event) => {
					const regex = /^\d+(,\d\d)?$/;
					if (
						String(event.target.value).length >= 10 &&
						regex.test(event.key)
					)
						event.preventDefault();
					event.target.value = this.mask(event.target.value);
				},
				false
			);
		});
	},
	created() {
		if (!this.isEmpty(this.value)) {
			this.focus = true;
		}
	},
};
</script>
