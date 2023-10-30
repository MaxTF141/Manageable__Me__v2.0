<template>
	<TaskLink v-for="task in filteredTasks" :key="task.id" :task="task" />
</template>

<script>
import TaskLink from '@/components/TasksLinkComponent.vue';
export default {
	components: {
		TaskLink
	},
	props: ['title'],

	created() {
		console.log(this.title);
	},
	computed: {
		tasks() {
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			console.log(tasks)
			return tasks;
		},
		filteredTasks() {
			switch (this.title) {
				case 'completed':
					return this.tasks.filter(tasks => tasks.isDone)
				case 'inprogress':
					return this.tasks.filter(task => !task.isDone && !this.isTaskOverdue(task));
				case 'overdue':
					return this.tasks.filter(task => !task.isDone && this.isTaskOverdue(task));
				default:
					return null;
			}
		}
		// inProgressTasks(title) {
		// 	// let tasks = this.tasks.filter(task => !task.isDone && !this.isTaskOverdue(task));
		// 	return this.tasks.filter(task => !task.isDone && !this.isTaskOverdue(task));
		// },
		// completedTasks() {
		// 	return this.tasks.filter(tasks => tasks.isDone)
		// },
		// overdueTasks() {
		// 	return this.tasks.filter(task => !task.isDone && this.isTaskOverdue(task));
		// }
	},
	methods: {
		isTaskOverdue(task) {
			const dueDate = new Date(task.dueDate);
			const currentDate = new Date();
			return dueDate < currentDate;
		}
	}
}
</script>
<style>
</style>
