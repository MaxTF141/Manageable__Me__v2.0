<template>
	<div class="home">
		<div class="header">
			<div class="container">
				<div class="row d-flex align-items-start">
					<div class="col-10">
						<h2 class="heading">Manageable Me</h2>
						<p class="current-date">{{currentDate()}}</p>
					</div>
					<div class="col-2">
						<img class="profile-img" src="https://i.postimg.cc/zvh1fcf4/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="categories">
			<div class="category-box">
				<p>content</p>
			</div>
			<div class="category-box">
				<p>content</p>
			</div>
			<div class="category-box">
				<p>content</p>
			</div>
			<div class="category-box">
				<p>content</p>
			</div>
		</div>
		<hr class="mx-auto">
		<section id="tasks" class="pt-3">
			<h2 class="text-center">Task list</h2>
			<div class="tasks d-flex flex-column align-items-center">
				<router-link v-for="task in tasks" :key="task.id" class="task-box d-flex flex-column justify-content-evenly" :to="{ name: 'task', params: { id: task.id } }" >
					<div class="priority-pill">
						<p class="m-0">{{task.priority}}</p>
					</div>
					<h4>{{task.title}}</h4>
					<div class="container-tasks d-flex justify-content-between">
						<div class="due-date d-flex align-items-end gap-1">
							<Icon icon="fluent-mdl2:date-time" color="#8d42b9" height="25" width="25"/>
							<p class="m-0">{{task.dueDate}}</p>
						</div>
						<div class="subtasks-count d-flex align-items-end gap-1">
							<Icon icon="mdi:subtasks" color="#8d42b9" height="25" width="25"/>
							<p class="m-0">{{ subtasksCount(task) }}</p>
						</div>
					</div>
				</router-link>
			</div>
		</section>
	</div>
</template>

<script>
import {Icon}  from '@iconify/vue';
export default {
	components: {
		Icon
	},

	computed: {
		tasks() {
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			return tasks; 
		}
	},

	methods: {
		currentDate() {
			let today  = new Date();
			let day = today.toLocaleString('en-US', { day: 'numeric' });
			let month = today.toLocaleString('en-US', { month: 'short' });
			let year = today.toLocaleString('en-US', { year: 'numeric' });
			return `${day}-${month}-${year}`;
		},
		subtasksCount(task) {
			return task.subtasks ? task.subtasks.length : 0;
		}
	}
}
</script>

<style>
.header {
	background: linear-gradient(90deg, #4a0174 0%, #aa03e2 100%);
	color: #fff;
	padding: 90px 10px;
	padding-top: 30px;
}

.heading {
	/* font-size: 1rem; */
	color: var(--secondary-color);
	font-weight: bold;
	font-size: 2rem;
}

.current-date {
	font-size: 0.8rem;
}

.profile-img {
	width: 2.5rem;
	border-radius: 50%;
}

.categories {
	overflow-x: auto;
	white-space: nowrap;
	width: 100%;
	margin-top: -3rem;
}

.categories::-webkit-scrollbar {
	display: none;
}

.category-box {
	display: inline-block;
	background-color: #fff;
	border-radius: 10px;
	height: 7rem;
	width: 8rem;
	margin: 0.5rem;
	font-size: 1rem;
	box-shadow: 0px 0px 15px -9px rgba(125,125,125,0.75);
}

.task-box {
	display: inline-block;
	background-color: #fff;
	border-radius: 10px;
	height: 10rem;
	width: 95%;
	margin: 0.5rem;
	font-size: 1rem;
	box-shadow: var(--light-box-shadow);
	padding: 10px;
}

hr{
	width: 70%;
	color: #4a01747b;
}

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
	color: var(--tertiary-color);
}


</style>
