<template>
	<section v-if="task" id="single-task" class="single-task">
		<form @submit.prevent="editTask(task)">
			<div class="edit-header py-2">
				<div class="icons d-flex justify-content-between pe-2">
					<router-link to="/">
						<Icon icon="ion:chevron-back-sharp" color="#fff" width="28" />
					</router-link>
					<button type="submit" class="btn btn- p-0">
						<Icon icon="ion:save-outline" color="#fff" width="25" />
					</button>
				</div>
				<div class="task-heading p-4">
					<textarea class="input-title" ref="autoResizeTitle" @input="autoResizeTitle" rows="1"
						v-model="task.title" />
					<h4 class="text-white">Entertainment</h4>
					<div class="row pt-3">
						<div class="col-6 d-flex align-items-center gap-2">
							<Icon icon="mdi:priority-high" color="#fff" width="37" />
							<div class="priority d-flex flex-column justify-content-center">
								<p class="priority-heading text-white m-0">Priority</p>
								<select class="form-select" id="priority" v-model="task.priority" required>
									<option selected>High</option>
									<option>Medium</option>
									<option>Low</option>
								</select>
							</div>
						</div>
						<div class="col-6 d-flex align-items-center gap-2">
							<Icon icon="fluent-mdl2:date-time" color="#fff" width="37" />
							<div class="date d-flex flex-column justify-content-center">
								<p class="date-heading text-white m-0">Due date</p>
								<input type="date" class="date-text text-white m-0" v-model="task.dueDate" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="task-container p-4">
				<h3 class="text-light">Description</h3>
				<textarea class="m-0 description" ref="autoResizeDescription" @input="autoResizeDescription" rows="1" v-model="task.description" />
				<div class="subtasks py-4">
					<h3 class="text-light">Subtasks</h3>
					<div class="subtask-box my-1" v-for="subtask in task.subtasks" :key="subtask.id">
						<!-- <div class="subtask-row"> -->
						<input type="text" class="text-light form-control my-2" v-model="subtask.description"
							placeholder="Add a Subtask" required>
						<!-- </div> -->
					</div>
				</div>
				<div class="btn-container d-flex flex-column mt-auto">
					<button @click="cancel()" class="done-btn btn">Cancel</button>
				</div>
				<p class="fs-italic" v-if="task.isDone">This task was marked done</p>
			</div>
			<div class="confirmation-modal">
				<div class="confirm-box">
					<p class="text-center">You sure you want to cancel? All
						unsaved changes will be lost.</p>
					<div class="d-flex justify-content-end gap-4 p-2">
						<button @click="yesCancel(task)" class="yes-btn btn btn-light"> Yes</button>
						<button @click="close()" class="btn btn-light">No</button>
					</div>
				</div>
			</div>
		</form>
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
		}
	},
	components: {
		Icon
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
		localStorageSet() {
			let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			let index = tasks.findIndex(task => task.id === this.id);
			if (index !== -1) {
				tasks[index] = this.task;
				localStorage.setItem('tasks', JSON.stringify(tasks));
			}
		},
		cancel() {
			const modal = document.querySelector('.confirmation-modal');
			modal.style.display = 'flex';
			this.localStorageSet();
		},
		yesCancel(task) {
			this.$router.push(`/tasks/${task.id}`);
		},
		close() {
			const modal = document.querySelector('.confirmation-modal');
			modal.style.display = 'none';
		},
		editTask(edit) {
			if (this.task) {
				const taskIndex = this.tasks.findIndex((t) => t.id === edit.id);
				if (taskIndex !== -1) {
					this.tasks[taskIndex] = edit;
					localStorage.setItem('tasks', JSON.stringify(this.tasks));
				}
			} else {
				return;
			}
		},
		autoResizeDescription() {
			let textarea = this.$refs.autoResizeDescription;
			textarea.style.height = 'auto'; // Reset the height to auto
			textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
			console.log(textarea.style.height)
		},
		autoResizeTitle() {
			let textarea = this.$refs.autoResizeTitle;
			textarea.style.height = 'auto'; // Reset the height to auto
			textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
			console.log(textarea.style.height)
		}
		

	},
	created() {
		this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	},
	mounted() {
		this.autoResizeDescription();
		this.autoResizeTitle();
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

.edit-header {
	position: sticky;
	top: 0;
	z-index: 0;
}

.task-container {
	position: relative;
	z-index: 1;
	height: 100%;
	padding-bottom: 7rem !important;
}

.excerpt::before {
	content: '';
	width: 100%;
	height: 100%;
	position: absolute;
	background: linear-gradient(to bottom, transparent, var(--quaternary-color));
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
	display: none;
	justify-content: center;
	align-items: center;
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

.input-title {
	background-color: rgba(255, 255, 255, 0);
	border: 0;
	color: white;
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1.2;
}

.description {
	/* min-height: 50px; */
	width: 100%;
	/* height: 140px; */
	background-color: rgba(255, 255, 255, 0);
	border: 0;
}

input,
select {
	background-color: rgba(255, 255, 255, 0);
	border: 0;
}

select {
	color: #fff;
	padding: 0.09rem;
}

option {
	color: #000;
}

.date-text,
#priority {
	font-size: 0.8rem;
	font-weight: bold;
}

.subtask-box input {
	background-color: rgba(255, 255, 255, 0);
}

.subtask-box input:focus {
	backdrop-filter: blur(0px);
}
</style>
