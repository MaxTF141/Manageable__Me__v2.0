<template>
		<router-link class="task-box my-2 d-flex flex-column justify-content-evenly"
			:to="{ name: 'task', params: { id: task.id } }">
			<div class="priority-pill">
				<p class="m-0">{{ task.priority }}</p>
			</div>
			<h4>{{ task.title }}</h4>
			<div class="container-tasks d-flex justify-content-between">
				<div class="due-date d-flex align-items-end gap-1">
					<Icon icon="fluent-mdl2:date-time" color="#8d42b9" height="25" width="25" />
					<p class="m-0">{{ task.dueDate }}</p>
				</div>
				<div class="subtasks-count d-flex align-items-end gap-1">
					<Icon icon="mdi:subtasks" color="#8d42b9" height="25" width="25" />
					<p class="m-0">{{ subtasksCount(task) }}</p>
				</div>
			</div>
		</router-link>
</template>
<script>
import { Icon } from '@iconify/vue';
export default {
	props: {
		task: Object
	},
	components: {
		Icon,
	},
	methods: {
		subtasksCount(task) {
			return task.subtasks ? task.subtasks.length : 0;
		}
	}
}
</script>
<style>

.task-box {
	display: inline-block;
	border-radius: 10px;
	height: 10rem;
	width: 100%;
	font-size: 1rem;
	padding: 10px;
	position: relative;
	box-shadow: var(--light-box-shadow);
	backdrop-filter: blur(7px);
	background-color: rgba(184, 184, 184, 0.317);
	border: 1px solid rgb(122, 122, 122);
}

/* .task-box::after {
	content: 'ddfdfd';
	position: absolute;
	top: 0;
	left: 0;
	width: inherit;
	height: inherit;
	box-shadow: inherit;
	border-radius: inherit;

} */

.priority-pill {
	background-color: #decbe8;
	color: var(--tertiary-color);
	display: inline-block;
	padding: 3px 12px;
	border-radius: 19px;
	width: fit-content;
	font-size: 0.8rem;
}

a {
	text-decoration: none;
	color: var(--secondary-color);
}
</style>
