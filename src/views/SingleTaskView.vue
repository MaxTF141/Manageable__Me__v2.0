<template>
	<section v-if="task" id="single-task" class="single-task">
		<div class="header py-2">
			<div class="icons d-flex justify-content-between">
				<router-link to="/">
					<Icon icon="ion:chevron-back-sharp" color="#fff" width="28" />
				</router-link>
				<router-link :to="{name: 'edit-task', params: {id: task.id}}">
					<Icon icon="lucide:pen-square" color="#fff" width="25" />
				</router-link>
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
			<h3 class="text-light">Description</h3>
			<p :class="excerptActive()" class="m-0 description">{{ task.description }}</p>
			<div class="read-more d-flex justify-content-center gap-1 align-items-center">
				<Icon :icon="iconToggle()" color="#fff" />
				<p class="text-center text-light m-0" @click.prevent="excerptToggle()">{{ textToggle() }}</p>
			</div>
			<h3 class="text-light">Subtasks</h3>
			<div class="subtask-box my-1" v-for="subtask in task.subtasks" :key="subtask.id">
				<div class="row">
					<div class="col-1">
						<Icon @click.prevent="toggleDone(subtask)" class="checkmark"
							:icon="subtask.completed ? 'mdi:checkbox-indeterminate' : 'material-symbols:indeterminate-check-box-outline'"
							:color="isDoneTick(subtask)" width="20" />
					</div>
					<div class="col-11">
						<p class="m-0" :style="'color: ' + isDoneColor(subtask)">{{ subtask.description }}</p>
					</div>
				</div>
			</div>
			<div class="btn-container d-flex flex-column mt-auto py-5">
				<button @click="confirmationModal" v-if="taskDone" class="done-btn btn">Done</button>
				<button v-else disabled class="done-btn btn">Done</button>
			</div>
		</div>
		<div class="confirmation-modal">
			<div class="confirm-box">
				<p class="text-center">Are you sure you want to mark <span class="fw-bold">"{{ task.title }}"</span> as
					completed?</p>
				<div class="d-flex justify-content-end gap-4 p-2">
					<router-link to="/">
						<button @click="isDone(task)" class="yes-btn btn btn-light">Yes, It's done</button>
					</router-link>
					<button @click="cancelBack(task)" class="btn btn-light">No, Not yet</button>
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
			tasks: [],
			editTasks: {
				title: '',
				description: '',
				dueDate: '',
				priority: '',
				subtasks: []
			}
		}
	},
	components: {
		Icon
	},
	watch: {
		'task.subtasks': {
			handler: function (subtasks) {
				const allSubtasksCompleted = subtasks.every(subtask => subtask.completed);
				if (!allSubtasksCompleted) {
					this.task.isDone = false; // Set task.isDone to false if not all subtasks are completed
				}
			},
			deep: true,
		},
	},
	computed: {
		task() {
			return this.tasks.find(task => task.id === this.id);
		},
		taskDone() {
			return this.task.subtasks.every(subtask => subtask.completed);
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
			if (subtask.completed) {
				return '#999999'
			} else {
				return '#fff'
			}
		},
		localStorageSet() {
			let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			let index = tasks.findIndex(task => task.id === this.id);
			if (index !== -1) {
				tasks[index] = this.task;
				localStorage.setItem('tasks', JSON.stringify(tasks));
			}
		},
		toggleDone(subtask) {
			subtask.completed = !subtask.completed;
			this.localStorageSet();
		},
		isDone(task) {
			task.isDone = true
			this.localStorageSet();
			console.log(task.isDone)
		},
		confirmationModal() {
			const modal = document.querySelector('.confirmation-modal');
			modal.style.display = 'flex';
		},
		cancelBack(task) {
			task.isDone = !task.isDone;
			const modal = document.querySelector('.confirmation-modal');
			modal.style.display = 'none';
			this.localStorageSet();
		}
	},
	created() {
		this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	}
}
</script>
<style scoped>
.single-task {
	height: 100vh;
	min-height: 100vh;
	background-color: #343E66;
}

.task-container {
	background-image: url('https://i.postimg.cc/dQ8mdqxy/kazuend-2-KXEb-8-G5vo-unsplash.jpg');
	background-attachment: fixed;
	background-repeat: no-repeat;
	background-size: cover;
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
	height: 100%;
}

.excerpt {
	position: relative;
	max-height: 6em;
	overflow: hidden;
	line-height: 1.4em;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	/* box-shadow: 0px -111px 26px -79px rgba(255,255,255,1) inset; */
}

.excerpt::before {
	content: '';
	width: 100%;
	height: 100%;
	position: absolute;
	background: linear-gradient(to bottom, transparent);
}


.subtask-box {
	display: inline-block;
	border-radius: 10px;
	width: 100%;
	font-size: 1rem;
	padding: 10px;
	box-shadow: var(--light-box-shadow);
	backdrop-filter: blur(7px);
	background-color: rgba(184, 184, 184, 0.317);
	border: 1px solid rgb(122, 122, 122);
}

.description {
	color: #fff;
	font-style: italic;
}

.confirmation-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 3;
}

.confirm-box {
	width: 95%;
	padding: 1rem;
	border-radius: 1rem;
	background-color: var(--quaternary-color);
	margin-bottom: 4rem;
}

.yes-btn {
	background-color: var(--primary-color);
	color: var(--quaternary-color);
}

.yes-btn:hover {
	background-color: var(--quaternary-color);
	color: var(--primary-color);
	border: solid 1px var(--primary-color);
}

.done-btn {
	color: var(--secondary-color);
	background-color: var(--primary-color);
}

.confirmation-modal {
	display: none;
	justify-content: center;
	align-items: center;
}
</style>
