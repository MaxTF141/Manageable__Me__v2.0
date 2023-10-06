<template>
	<TaskLink v-for="task in tasks" :key="task.id"/>
</template>

<script>
import TaskLink from '@/components/TasksLinkComponent.vue';
export default {
	components: {
		TaskLink
	},
	props: ['tasks'],

	created() {
		return console.log(this.tasks);
	}
}
</script>
<style>
</style>
