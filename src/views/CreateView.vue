<template>
	<div class="create-task p-3">
		<div class="form">
			<form @submit.prevent="addTask()">
				<div class="links d-flex justify-content-between pb-4">
					<h4 @click="isEmpty()" class="cancel-btn my-auto">Cancel</h4>
					<h4 class="my-auto">{{ returnTitle() }}</h4>
					<button type="submit" class="done-btn">Done</button>
				</div>
				<div class="mb-3">
					<label for="title" class="form-label m-0">Title</label>
					<input type="text" class="form-control text-light" id="title" placeholder="Title" v-model="add.title" required>
				</div>
				<div class="mb-3">
					<label for="description" class="form-label m-0">Description</label>
					<textarea class="form-control text-light" id="description" rows="5" placeholder="Description"
						v-model="add.description" required></textarea>
				</div>
				<div class="mb-3">
					<label for="priority" class="form-label m-0">Priority</label>
					<select class="form-select text-light" id="priority" v-model="add.priority" required>
						<option selected>High</option>
						<option>Medium</option>
						<option>Low</option>
					</select>
				</div>
				<div class="mb-3">
					<label for="due-date" class="form-label m-0">Due Date</label>
					<input type="date" class="form-control text-light" id="due-date" placeholder="Due Date" v-model="add.dueDate">
				</div>
				<div class="mb-3 d-flex flex-column">
					<label for="subtasks" class="form-label m-0">Subtasks</label>
					<div class="subtasks-input" v-for="subtask in add.subtasks" :key="subtask.id">
						<input type="text" class="form-control my-2" v-model="subtask.description"
							placeholder="Add a Subtask" required>
						<Icon class="subtask-bin" icon="uiw:delete" color="#8d42b9" width="21"
							@click="removeSubtask(subtask.id)"/>
					</div>
					<button type="button" class="add-subtask btn btn-light" @click="addSubtaskField">Add Subtask</button>
				</div>
			</form>
		</div>
	</div>
	<div v-if="confirmationBoxDisplay" class="confirmation-modal d-flex justify-content-center align-items-center">
		<div class="confirm-box">
			<h3>All Unsaved information will be lost. Are you sure you want to continue?</h3>
			<div class="d-flex justify-content-end gap-4 p-2">
				<router-link to="/">
					<button @click="confirmCancel()" class="yes-btn btn btn-light">Yes, Cancel</button>
				</router-link>
				<button @click="cancelBack()" class="btn btn-light">No, Take me back</button>
			</div>
		</div>
	</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/vue';

export default {
	components: {
		Icon,
	},
	data() {
		return {
			add: {
				id: uuidv4(),
				title: '',
				description: '',
				priority: '',
				dueDate: '',
				subtasks: [],
				isDone: false,
			},
			confirmationBoxDisplay: false,
		};
	},
	methods: {
		addSubtaskField() {
			const newSubtaskId = uuidv4();
			this.add.subtasks.push({
				id: newSubtaskId,
				description: '',
				completed: true,
			});
		},

		addTask() {
			// Remove empty subtasks
			this.add.subtasks = this.add.subtasks.filter((subtask) => subtask.description.trim() !== '');

			// Add the task to the tasks array in local storage
			let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			tasks.push(this.add);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			this.add = {
				id: uuidv4(),
				title: '',
				description: '',
				priority: '',
				dueDate: '',
				subtasks: [],
			};
		},
		removeSubtask(subtaskId) {
			this.add.subtasks = this.add.subtasks.filter((subtask) => subtask.id !== subtaskId);
		},
		returnTitle() {
			return this.add.title ? this.add.title : 'New Task';
		},
		confirmation() {
			this.confirmationBoxDisplay = !this.confirmationBoxDisplay;
			const modal = document.querySelector('.modal');
			modal.style.display = this.confirmationBoxDisplay ? 'block' : 'none';
		},
		isEmpty() {
			if (
				this.add.title !== '' ||
				this.add.description !== '' ||
				this.add.priority !== '' ||
				this.add.dueDate !== '' ||
				this.add.subtasks.length > 0
			) {
				this.confirmationBoxDisplay = true;
			} else {
				this.$router.push('/'); // Go back if no unsaved changes
			}
		},
		confirmCancel() {
			this.$router.push('/');
		},
		cancelBack() {
			this.confirmationBoxDisplay = false;
		},
	},
	created() {
		window.addEventListener('popstate', this.isEmpty);
	},
	beforeMount() {
		window.removeEventListener('popstate', this.isEmpty);
	},
};
</script>

<style scoped>
input,
select {
	height: 3rem;
}

input,
textarea,
select {
	border-radius: 15px !important;
	box-shadow: var(--light-box-shadow) !important;
	backdrop-filter: blur(7px) !important;
	background-color: rgba(184, 184, 184, 0.317) !important;
	border: 1px solid rgb(122, 122, 122) !important;
}

input:focus,
textarea:focus,
select:focus {
	border: 1px solid var(--primary-color) !important;
	box-shadow: 0px 0px 10px var(--primary-color) !important;
}

option {
	color: #000;
}

.done-btn,
.cancel-btn {
	border: none;
	background-color: rgba(255, 255, 255, 0);
	color: var(--primary-color) !important;
}

.subtasks-input {
	position: relative;
}

.subtask-bin {
	position: absolute;
	top: 35%;
	right: 0.8rem;
	cursor: pointer;
}

.add-subtask {
	color: var(--primary-color);
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

</style>
