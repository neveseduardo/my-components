<template>
	<div class="g-pagination">
		<div class="per_page_wrapper">
			<div class="per_page">
				<el-select @change="onChangePerPage" :value="source.per_page">
					<el-option
						v-for="(item, index) in [20, 30, 50, 100]"
						:key="index"
						:label="item"
						:value="item"/>
				</el-select>
			</div>
			<div class="data-info">
				<span>
					{{ source.per_page }} Itens por página,
					{{ source.total }} Registro(s)
				</span>
			</div>
		</div>

		<nav class="navigation">
			<ul class="list">
				<li v-if="showFirstPageButton" class="list-item prev">
					<a @click.prevent="navigate(1)">
						<g-icon
							provide="mi"
							type="outlined"
							name="first_page"/>
					</a>
				</li>
				<li v-if="showPrev" class="list-item prev">
					<a @click.prevent="navigate(currentPage - 1)">
						<g-icon
							provide="mi"
							type="outlined"
							name="chevron_left"></g-icon>
					</a>
				</li>
				<li v-if="showPrevMore" class="list-item prev-more">
					<g-icon provide="mi" type="outlined" name="more_horiz" />
				</li>

				<li
					v-for="(page, index) in pages"
					:key="index"
					class="list-item page"
					:class="{ active: page === currentPage }">
					<a @click.prevent="navigate(page)">{{ page }}</a>
				</li>

				<li v-if="showNextMore" class="list-item next-more">
					<g-icon provide="mi" type="outlined" name="more_horiz" />
				</li>

				<li v-if="showNext" class="list-item next">
					<a @click.prevent="navigate(currentPage + 1)">
						<g-icon
							provide="mi"
							type="outlined"
							name="chevron_right"/>
					</a>
				</li>
				<li v-if="showLastPageButton" class="list-item prev">
					<a @click.prevent="navigate(totalPages)">
						<g-icon provide="mi" type="outlined" name="last_page" />
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'g-pagination',
	data: () => ({
		pagerCount: 6,
		showPrevMore: false,
		showNextMore: false,
	}),
	props: {
		source: {
			type: Object,
			default: () => ({
				total: 0,
				per_page: 20,
				current_page: 1,
			}),
			required: true,
			validator: (v) => {
				const msg =
					'Parâmetros ausentes nos dados de paginação! São necessários: [total, per_page, current_page ou page].';
				const { NODE_ENV } = process.env;
				if (!Object.keys(v).includes('total')) {
					if (NODE_ENV === 'development') console.error(msg);
					return false;
				}
				if (!Object.keys(v).includes('per_page')) {
					if (NODE_ENV === 'development') console.error(msg);
					return false;
				}
				if (
					!Object.keys(v).includes('current_page') &&
					!Object.keys(v).includes('page')
				) {
					if (NODE_ENV === 'development') console.error(msg);
					return false;
				}
				return true;
			},
			description:
				'Dados de paginação padrão: current_page ou page, per_page e total.',
		},
	},
	methods: {
		range(start, end) {
			return [...Array(end - start + 1).keys()].map((x) => x + start);
		},
		navigate(page) {
			const { currentPage } = this;
			if (page === currentPage) return;
			return this.$emit('navigate', {
				per_page: this.source.per_page,
				current_page: page,
				page,
			});
		},
		onChangePerPage(perPage) {
			const { currentPage } = this;
			return this.$emit('navigate', {
				per_page: perPage,
				current_page: currentPage,
				page: currentPage,
			});
		},
	},
	computed: {
		currentPage() {
			const { page, current_page, pagina } = this.source;
			return this.isEmpty(page) ? current_page : page;
		},
		showPagination() {
			return true;
		},
		mutablePerPage: {
			get() {
				return this.source.per_page;
			},
		},
		totalPages() {
			const { total, per_page } = this.source;
			const totalPages = Number(Math.ceil(total / per_page));
			return Number.isNaN(totalPages) ? 0 : totalPages;
		},
		showNext() {
			const { totalPages } = this;
			return this.currentPage !== totalPages && totalPages > 1;
		},
		showPrev() {
			const { totalPages } = this;
			return this.currentPage > 1 && totalPages > 1;
		},
		showFirstPageButton() {
			return this.currentPage > 3;
		},
		showLastPageButton() {
			const { totalPages } = this;
			return this.currentPage < totalPages - 3;
		},
		pages() {
			const { currentPage } = this;
			const { pagerCount, totalPages } = this;
			const halfPagerCount = pagerCount / 2;

			let showPrevMore = false;
			let showNextMore = false;

			if (totalPages > pagerCount) {
				if (currentPage > pagerCount - halfPagerCount)
					showPrevMore = true;
				if (currentPage < totalPages - halfPagerCount)
					showNextMore = true;
			}
			let array = [];

			if (showPrevMore && !showNextMore) {
				const startPage = totalPages - (pagerCount - 2);
				array = this.range(startPage, totalPages);
			} else if (!showPrevMore && showNextMore) {
				array = this.range(1, pagerCount - 1);
			} else if (showPrevMore && showNextMore) {
				const offset = Math.floor(pagerCount / 2) - 1;
				const [start, end] = [
					currentPage - offset,
					currentPage + offset,
				];
				array = this.range(start, end);
			} else array = this.range(1, totalPages);

			this.showPrevMore = showPrevMore;
			this.showNextMore = showNextMore;

			return array;
		},
	},
};
</script>
