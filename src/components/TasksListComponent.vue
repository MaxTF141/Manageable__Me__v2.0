<template>
	<h5 class="m-0 text-light">{{ title }}</h5>
	<div v-if="tasks.length" :class="tasksLength()" class="tasks pb-4 d-flex flex-column align-items-center">
		<TaskLink v-for="task in modifiedTasks" :key="task.id" :task="task" />
		<div v-if="tasks.length > 3" class="">
			<div @click="allTasks(tasks, title)" class="see-all d-flex align-items-center">
				<p class="m-0">See All</p>
				<Icon icon="iconamoon:arrow-right-2-thin" width="27" />
			</div>
		</div>
	</div>
	<div v-else class="empty-message py-3">
		<p class="text-center fst-italic fw-lighter text-light">{{ message }}</p>
	</div>
</template>
<script>
import TaskLink from '@/components/TasksLinkComponent.vue';
import { Icon } from '@iconify/vue';
export default {
	components: {
		TaskLink,
		Icon
	},
	props: {
		title: String,
		message: String,
		tasks: Array
	},
	computed: {
		modifiedTasks() {
			if (this.tasks.length > 3) {
				return this.tasks.slice(0, 3);
			} else {
				return this.tasks;
			}
		}
	},
	methods: {
		tasksLength() {
			return this.tasks.length > 3 ? 'excerpt' : '';
		},
		allTasks(tasks, title) {
			let titleSpaceless = title.split(' ').join('&');
			let lowerCaseTitle = titleSpaceless.toLowerCase();
			console.log(tasks)
			this.$router.push({
				name: 'all&tasks',
				params: {
					// tasks: tasks,
					title: lowerCaseTitle
				}
			});
			console.log(tasks, title)
		}
	}
}
</script>
<style>
.excerpt {
	position: relative;
	/* max-height: 50em; */
	overflow: hidden;
	/* line-height: 1.4em; */
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.excerpt::before {
	content: '';
	width: 100%;
	height: 30%;
	position: absolute;
	bottom: 0;
	background: linear-gradient(to bottom, transparent, rgba(194, 194, 194, 0));
}

.see-all {
	position: absolute;
	bottom: 0;
}
</style>
