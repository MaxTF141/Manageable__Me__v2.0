<template>
	<div class="px-3">
		<div class="all-tasks-header d-flex justify-content-between align-items-center">
			<router-link to="/">
				<Icon icon="ion:chevron-back-sharp" color="#fff" width="28" />
			</router-link>
			<h2 class="p-3 m-0 text-light">{{ newTitle() }} tasks</h2>
		</div>
		<TaskLink class="my-3" v-for="task in filteredTasks" :key="task.id" :task="task" />
	</div>
</template>

<script>
import TaskLink from '@/components/TasksLinkComponent.vue';
import { Icon } from '@iconify/vue'
export default {
	components: {
		TaskLink,
		Icon
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
				case 'in&progress':
					return this.tasks.filter(task => !task.isDone && !this.isTaskOverdue(task));
				case 'overdue':
					return this.tasks.filter(task => !task.isDone && this.isTaskOverdue(task));
				default:
					return null;
			}
		}
	},
	methods: {
		isTaskOverdue(task) {
			const dueDate = new Date(task.dueDate);
			const currentDate = new Date();
			return dueDate < currentDate;
		},
		newTitle() {
			let newTitle = this.title.split('&').join(' ');
			let result = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
			console.log(result)
			return result;
		}
	}
}
</script>
<style>
</style>
