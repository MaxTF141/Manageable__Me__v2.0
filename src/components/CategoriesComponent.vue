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
	background-color: #fff;
	border-radius: 10px;
	height: 7rem;
	width: 8rem;
	margin: 0.5rem;
	font-size: 1rem;
	box-shadow: 0px 0px 15px -9px rgba(125, 125, 125, 0.75);
}
</style>
