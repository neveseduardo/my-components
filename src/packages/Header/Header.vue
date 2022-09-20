<template>
	<div class="page-header ot-gap-5 g-header">
		<template v-if="!loading">
			<div class="flex flex-y-center fade-in">
				<div class="flex flex-y-center w-full ot-gap-5">
					<g-link
						v-if="button_back_href !== ''"
						:href="button_back_href"
						just_icon
						type="secondary"
						icon="arrow_back"
						@click="handleRedirect"
						v-tooltip.bottom="'Voltar para a página anterior'"/>
					<h1 class="title">
						{{ title }}
					</h1>
				</div>
				<div class="flex flex-x-end w-full">
					<slot />
				</div>
			</div>
			<div
				v-if="section_name !== ''"
				:class="{ hasButtonBack: button_back_href }">
				<nav aria-label="breadcrumb">
					<ul class="breadcrumb">
						<li v-if="section_name" class="breadcrumb-item">
							<a href="#" class="section">
								{{ section_name }}
							</a>
						</li>
						<li
							v-for="(link, linkIndex) in links"
							:key="linkIndex"
							class="breadcrumb-item">
							<a
								:href="link.href"
								:class="{ disabled: link.activePage }">
								{{ link.name }}
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</template>
		<template v-else>
			<el-skeleton animated>
				<template slot="template">
					<div class="flex flex-column ot-gap-12">
						<el-skeleton-item style="height: 35px; width: 100%" />
						<el-skeleton-item variant="p" style="width: 20%" />
					</div>
				</template>
			</el-skeleton>
		</template>
	</div>
</template>

<script>
export default {
	name: 'GHeader',
	components: {},
	props: {
		title: {
			type: [String, Function],
			default: '',
			description:
				'Título da página, pode ser uma função que retorne o nome da página',
		},
		section_name: {
			type: String,
			default: null,
			description: 'Nome da seção, se houver',
		},
		links: {
			type: Array,
			default: () => [],
			description:
				'links p/ o breadcrumb, deve conter: name: "Nome da página", href: "Link", activePage: se o link é a pagina atual',
		},
		button_back_href: {
			type: String,
			default: '',
			description: 'Exibir botão de Voltar ao lado do título',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Exibir estado de loading',
		},
	},
	methods: {
		handleRedirect() {
			window.history.back();
		},
	},
};
</script>
