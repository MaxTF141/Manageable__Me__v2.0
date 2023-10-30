<template>
	<TasksListComponent class="my-3" :tasks="inProgressTasks" title="In Progress" message="No tasks yet" />
	<TasksListComponent class="my-3" :tasks="overdueTasks" title="Overdue" message="Congrats! No overdue tasks. Keep up the good work"/>
	<TasksListComponent class="my-3" :tasks="completedTasks" title="Completed" message="Hmm I think it's about time that something gets done around here "/>
</template>
<script>
import TasksListComponent from '@/components/TasksListComponent.vue';
export default {
	components: {
		TasksListComponent
	},
	computed: {
		tasks() {
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			return tasks;
		},
		inProgressTasks() {
			// let tasks = this.tasks.filter(task => !task.isDone && !this.isTaskOverdue(task));
			return this.tasks.filter(task => !task.isDone && !this.isTaskOverdue(task));
		},
		completedTasks() {
			return this.tasks.filter(tasks => tasks.isDone)
		},
		overdueTasks() {
			return this.tasks.filter(task => !task.isDone && this.isTaskOverdue(task));
		}
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
