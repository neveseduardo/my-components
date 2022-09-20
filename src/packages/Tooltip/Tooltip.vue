<template>
	<div class="g-tooltip">
		<el-tooltip :effect="effect" :content="content" :placement="placement">
			<slot />
		</el-tooltip>
	</div>
</template>

<script>
export default {
	name: 'GTooltip',
	props: {
		effect: { type: String, default: 'dark', description: 'dark/light' },
		content: {
			type: String,
			default: '',
			required: true,
			description: 'O conteúdo do tooltip.',
		},
		placement: {
			type: String,
			default: 'bottom',
			description:
				'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end',
		},
	},
};
</script>
