<template>
	<div class="g-accordion" :class="{ 'is-open': isOpen }">
		<div class="header">
			<h5 class="title">{{ title }}</h5>
			<slot name="action"></slot>
			<a
				href=""
				@click.stop.prevent="collapseAccordion"
				class="toggle-accordion-button"
				:class="{ 'arrow-button': is_arrow_icon, 'opened': isOpen }">
				<template v-if="!is_arrow_icon">
					<div v-show="isOpen">
						<g-icon provide="mi" type="outlined" name="unfold_less" />
						<span>Ocultar tudo</span>
					</div>
					<div v-show="!isOpen">
						<g-icon provide="mi" type="outlined" name="unfold_more" />
						<span>Exibir tudo</span>
					</div>
				</template>
				<template v-else>
					<g-icon name="expand_more" />
				</template>
			</a>
		</div>
		<div
			class="body"
			:style="{ maxHeight: isOpen ? maxHeight + 'px' : 0 }"
			ref="accordionItemBody">
			<div class="accordion-body">
				<slot name="body"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GAccordion',
	data() {
		return {
			isOpen: false,
			maxHeight: 0,
		};
	},
	props: {
		title: { type: String, default: '' },
		is_arrow_icon: { type: Boolean, default: false },
	},
	mounted() {
		this.observerMaxHeight();
	},
	methods: {
		collapseAccordion() {
			this.isOpen = !this.isOpen;
		},
		observerMaxHeight() {
			const ro = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const { height } = entry.contentRect;
					this.maxHeight = height;
				}
			});
			const element = document.querySelector('.g-accordion .body .accordion-body');
			ro.observe(element);
		},
	},
};
</script>
