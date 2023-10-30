<template>
	<div class="home">
		<HomeHeader />
		<Categories />
		<hr class="mx-auto">
		<section id="tasks" class="px-3">
			<h2 class="text-center text-light">Task list</h2>
			<Tasks />
		</section>
	</div>
</template>

<script>
import HomeHeader from '@/components/HomeHeaderComponent.vue'
import Categories from '@/components/CategoriesComponent.vue'
import Tasks from '@/components/TasksComponent.vue'
export default {
	components: {
		HomeHeader,
		Categories,
		Tasks
	},

}
</script>

<style scoped>

hr {
	width: 70%;
	color: #4a01747b;
}
</style>
