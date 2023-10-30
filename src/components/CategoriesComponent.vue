<template>
	<section class="categories">
		<div class="category-box">
			<p>content</p>
		</div>
		<div class="category-box">
			<p>content</p>
		</div>
		<div class="category-box">
			<p>content</p>
		</div>
		<div class="category-box">
			<p>content</p>
		</div>
	</section>
</template>
<script>
export default {

}
</script>
<style>
.categories {
	overflow-x: auto;
	white-space: nowrap;
	width: 100%;
	margin-top: -3rem;
}

.categories::-webkit-scrollbar {
	display: none;
}

.category-box {
	display: inline-block;
	border-radius: 10px;
	height: 7rem;
	width: 8rem;
	margin: 0.5rem;
	font-size: 1rem;
	box-shadow: var(--light-box-shadow);
	backdrop-filter: blur(7px);
	background-color: rgba(184, 184, 184, 0.317);
	border: 1px solid rgb(122, 122, 122);
}
</style>
