<template>
	<div
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
		class="g-money"
		:class="[{ focus, is_invalid: invalid, is_disabled: disabled }]">
		<input
			type="text"
			:disabled="disabled"
			ref="input"
			v-model="mutable"
			@keypress="onKeyPress($event)"
			@keydown.backspace="onDelete($event)"
			@keydown.up="onUp($event)"
			@keydown.down="onDown($event)"
			@focus="onFocus($event)"
			@blur="onBlur($event)"/>
		<span class="placeholder-item" @click="onFocus">{{ placeholder }}</span>
		<span
			@click="clearInput"
			v-if="this.value !== '' && this.value !== '' && this.hover"
			class="close-icon-suffix">
			<i class="el-icon-circle-close"></i>
		</span>
		<span class="inner-spin-button">
			<a class="g-money-up" @click.stop.prevent="onUp">
				<i class="el-icon-caret-top"></i>
			</a>
			<a class="g-money-down" @click.stop.prevent="onDown">
				<i class="el-icon-caret-bottom"></i>
			</a>
		</span>
	</div>
</template>

<script>
export default {
	name: 'GMoneyInput',
	data() {
		return {
			focus: false,
			hover: false,
			max: 17,
		};
	},
	props: {
		value: { default: '' },
		precision: {
			type: Number,
			default: 5,
			description: 'Valor fix para um ponto flutuante. ex: 10,00005',
		},
		placeholder: {
			type: String,
			default: 'Digite um valor',
			description: 'Valor do placeholder do input',
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
	},
	computed: {
		mutable: {
			get() {
				return this.format(this.value);
			},
			set(value) {
				this.$emit('input', this.unformat(value));
			},
		},
	},
	methods: {
		clearInput() {
			this.$emit('input', 0);
		},
		onMouseEnter() {
			this.hover = true;
		},
		onMouseLeave() {
			this.hover = false;
		},
		onKeyPress(event) {
			const numbers = this.onlyNumbers(event.target.value);

			if (numbers.length >= this.max - 1) return event.preventDefault();

			if (Number(this.value) === 0 && event.key === '0')
				return event.preventDefault();

			if (!/\d/.test(event.key)) return event.preventDefault();
		},
		onDelete(event) {
			const value = event.target.value;
			const numbers = this.onlyNumbers(value);

			if (numbers.length <= this.precision + 1) {
				this.$emit('input', this.unformat(value.slice(0, -1)));
				return event.preventDefault();
			}
		},
		operation(value, op = null) {
			const fixed = parseFloat(
				Number(this.unformat(value)).toFixed(this.precision)
			).toPrecision(this.precision);
			const aux = parseFloat(
				String(Number(0).toFixed(this.precision)).slice(0, -1) + 1
			).toPrecision(this.precision);
			if (op === 'add') return Number(fixed) + Number(aux);
			return Number(fixed) - Number(aux);
		},
		onUp(event) {
			if (this.disabled) return;
			let out = this.operation(this.mutable, 'add');
			if (out !== 0) {
				out = out.toFixed(this.precision);
			}
			this.$emit('input', out);
			event.preventDefault();
		},
		onDown(event) {
			if (this.disabled) return;
			let out = this.operation(this.mutable, 'sub');
			if (out !== 0) {
				out = out.toFixed(this.precision);
			}
			this.$emit('input', out);
			event.preventDefault();
		},
		onFocus(event) {
			if (!this.disabled) {
				this.$refs.input.focus();
				this.focus = true;
			}
			this.$emit('focus', event);
		},
		onBlur(event) {
			setTimeout(() => {
				this.$refs.input.blur();
				this.focus = !this.isEmpty(this.mutable) ? true : false;
			}, 100);
			this.$emit('blur', event);
		},
		round(value, precision) {
			const power = Math.pow(10, precision);
			return Math.round(value * power + Number.EPSILON * power) / power;
		},
		precisionRound(number, precision) {
			const factor = Math.pow(10, precision);
			return Math.round(number * factor) / factor;
		},
		format(value) {
			value = isNaN(value) ? 0 : value;
			const nf = new Intl.NumberFormat('pt-br', {
				style: 'currency',
				currency: 'BRL',
				minimumFractionDigits: this.precision,
				maximumFractionDigits: this.precision,
				signDisplay: 'exceptZero',
			});
			return nf.format(value);
		},
		unformat(value) {
			const negative = value.indexOf('-') >= 0 ? -1 : 1;
			let numbers = this.onlyNumbers(value);
			const firstNumber = numbers.charAt(0);
			if (numbers.length <= this.precision + 2 && firstNumber === '0')
				numbers = numbers.slice(1);
			const currency = this.numbersToCurrency(numbers, this.precision);
			const ret = currency * negative;
			return ret.toFixed(this.precision);
		},
		numbersToCurrency(numbers) {
			const exp = Math.pow(10, this.precision);
			const float = +numbers / +exp;
			return float.toFixed(this.fixed(this.precision));
		},
		fixed() {
			return Math.max(0, Math.min(this.precision, this.max));
		},
		onlyNumbers(value) {
			value = String(value);
			const replace = value.replace(/\D+/g, '');
			return replace;
		},
	},
	created() {
		if (!this.isEmpty(this.mutable)) {
			this.focus = true;
		}
	},
};
</script>
