<template>
	<div
		class="g-select g-select-user"
		:class="{ focused, focus, is_invalid, is_disabled }">
		<el-select
			ref="select"
			popper-class="g-select-popper"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			v-model="mutable"
			placeholder=""
			filterable
			clearable
			:disabled="disabled"
			:multiple="multiple"
			size="large"
			collapse-tags>
			<template #empty>
				<ul class="el-scrollbar__view el-select-dropdown__list">
					<li
						v-for="(item, index) in options"
						:key="index"
						class="el-select-dropdown__item"
						:class="{
							selected: false,
							'is-disabled': disabled,
						}"
						@click.stop="onClickOption(item)">
						<template v-if="isEmpty(item.avatar)">
							<span class="g-select-user-avatar">
								<g-icon name="person" />
							</span>
						</template>
						<template v-else>
							<span class="g-select-user-avatar">
								<img :src="item.avatar" alt="" />
							</span>
						</template>
						<span>{{ item.label }}</span>
					</li>
				</ul>
			</template>
		</el-select>
		<span @click="$refs.select.focus()" class="d-flex">
			<template v-if="is_loading">Carregando opções...</template>
			<template v-else>{{ placeholder }}</template>
		</span>
	</div>
</template>

<script>
export default {
	name: 'GSelectUser',
	data: () => ({
		focus: false,
		focused: false,
		selected: '',
	}),
	props: {
		value: { required: true, default: null },
		options: { type: Array, default: () => [] },
		placeholder: { type: String, default: '' },
		multiple: { type: Boolean, default: false },
		invalid: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		is_loading: { type: Boolean, default: false },
	},
	computed: {
		mutable: {
			get: function() {
				if (this.isEmpty(this.value)) {
					if (this.$refs.select) this.$refs.select.blur();
				}
				this.focus = !this.isEmpty(this.value);

				return this.value?.label ?? this.value;
			},
			set: function(value) {
				this.$emit('input', value);
			},
		},
		is_invalid() {
			return this.invalid && this.isEmpty(this.value);
		},
		is_disabled() {
			return this.disabled || this.is_loading;
		},
	},
	methods: {
		onClickOption(option) {
			if (option.childrens && option.childrens.length) {
				return (this.selected = option.label);
			}
			return this.handleSelect(option);
		},
		handleSelect({ value, label }) {
			this.$emit('input', { label, value });
			this.$emit('change', { label, value });
			this.$refs.select.blur();
			this.handleFocus(false);
			this.onBlur(value);
			this.clearSelected();
		},
		handleFocus(value) {
			this.focus = value;
			this.focused = value;
		},
		onChange(value) {
			this.onBlur(value);
			this.$emit('change', value);
		},
		onFocus() {
			if (!this.is_disabled) this.focus = true;
		},
		onBlur(value = null) {
			this.$emit('blur', value);
			setTimeout(() => {
				if (!this.isEmpty(value) && !value.target)
					return (this.focus = true);
				this.focus = !this.isEmpty(this.mutable);
			}, 50);
			this.selected = '';
		},
		clearSelected() {
			this.selected = null;
		},
		onClear() {
			this.onBlur();
		},
		onBlurEvent(event) {
			this.$emit('blur', this.mutable);
			this.focus = !this.isEmpty(this.mutable);
		},
		createEvent() {
			const inputSelect = document.querySelectorAll('.el-select__input');
			Array.from(inputSelect).map((item) =>
				item.addEventListener('blur', this.onBlurEvent, true)
			);
		},
	},
	mounted() {
		this.$watch(
			() => this.$refs?.select?.$children[0]?.focused ?? false,
			(val) => (this.focused = val)
		);
		this.focus = !this.isEmpty(this.value);
		this.createEvent();
	},
};
</script>
