<template>
	<section v-if="task" id="single-task" class="single-task">
		<div class="header py-2">
			<div class="icons d-flex justify-content-between">
				<router-link to="/">
					<Icon icon="ion:chevron-back-sharp" color="#fff" width="28" />
				</router-link>
				<Icon icon="lucide:pen-square" color="#fff" width="25" />
			</div>
			<div class="task-heading p-4">
				<h2 class="task-title text-white">{{ task.title }}</h2>
				<h4 class="text-white">Entertainment</h4>
				<div class="row pt-3">
					<div class="col-6 d-flex align-items-center gap-2">
						<Icon icon="mdi:priority-high" color="#fff" width="37" />
						<div class="priority d-flex flex-column justify-content-center">
							<p class="priority-heading text-white m-0">Priority</p>
							<p class="priority-text text-white m-0">{{ task.priority }}</p>
						</div>
					</div>
					<div class="col-6 d-flex align-items-center gap-2">
						<Icon icon="fluent-mdl2:date-time" color="#fff" width="37" />
						<div class="date d-flex flex-column justify-content-center">
							<p class="date-heading text-white m-0">Due date</p>
							<p class="date-text text-white m-0">{{ task.dueDate }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="task-container p-4">
			<h3>Description</h3>
			<p :class="excerptActive()" class="m-0 description">{{ task.description }}</p>
			<div class="read-more d-flex justify-content-center gap-1 align-items-center">
				<Icon :icon="iconToggle()" />
				<p class="text-center m-0" @click.prevent="excerptToggle()">{{ textToggle() }}</p>
			</div>
			<h3>Subtasks</h3>
			<div class="subtask-box my-1" v-for="subtask in task.subtasks" :key="subtask.id">
				<div class="row">
					<div class="col-1">
						<Icon @click.prevent="toggleDone(subtask)" class="checkmark" icon="teenyicons:tick-circle-solid" :color="isDoneTick(subtask)" />
					</div>
					<div class="col-11">
						<p class="m-0" :style="'color: ' + isDoneColor(subtask)">{{ subtask.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { Icon } from '@iconify/vue'
export default {
	props: ['id'],
	data() {
		return {
			excerpt: true,
			tasks: []
		}
	},
	components: {
		Icon
	},
	computed: {
		task() {
			return this.tasks.find(task => task.id === this.id);
		}
	},
	methods: {
		excerptActive() {
			return this.excerpt ? 'excerpt' : '';
		},
		excerptToggle() {
			this.excerpt = !this.excerpt;
		},
		textToggle() {
			if (this.excerpt) {
				return 'read more'
			} else {
				return 'read less'
			}
		},
		iconToggle() {
			if (this.excerpt) {
				return 'ep:arrow-down'
			} else {
				return 'ep:arrow-up'
			}
		},
		isDoneTick(subtask) {
			if (subtask.completed) {
				return '#5a5a5a'
			} else {
				return '#8d42b9'
			}
		},
		isDoneColor(subtask) {
			if(subtask.completed) {
				return '#999999'
			} else {
				return ''
			}	
		},
		toggleDone(subtask) {
			subtask.completed = !subtask.completed;

			let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			let index = tasks.findIndex(task => task.id === this.id);
			if(index !== -1) {
				tasks[index] = this.task;
				localStorage.setItem('tasks', JSON.stringify(tasks));
			}
		},
	},
	created() {
		this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	}
}
</script>
<style scoped>
.single-task {
	background: linear-gradient(90deg, #4a0174 0%, #aa03e2 100%);
	height: 100vh;
}

.task-container {
	background-color: var(--quaternary-color);
	width: 100vw;
	min-height: 100vh;
	max-height: 80vh;
	overflow-y: auto;
	border-radius: 30px 30px 0 0;
	box-shadow: var(--dark-box-shadow);
}

.task-title {
	font-weight: bold;
}

.priority-text,
.date-text {
	font-size: 0.8rem;
	font-weight: bold;
}

.priority-heading,
.date-heading {
	font-size: 0.7rem;
}

.header {
	position: sticky;
	top: 0;
	z-index: 0;
}

.task-container {
	position: relative;
	z-index: 1;
}

/* .excerpt {
	max-height: 6em;
	overflow: hidden;
	line-height: 1.4em;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	box-shadow: 0px -104px 40px -120px rgb(9, 9, 9) inset;
} */

.subtask-box {
	display: inline-block;
	background-color: var(--secondary-color);
	border-radius: 10px;
	/* height: 10rem; */
	width: 95%;
	/* margin: 0.5rem; */
	font-size: 1rem;
	box-shadow: var(--light-box-shadow);
	padding: 10px;
}

.description {
	font-weight: lighter;
	color: #484848;
	font-style: italic;
}
</style>
