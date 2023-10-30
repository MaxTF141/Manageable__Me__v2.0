import { createRouter, createWebHistory } from 'vue-router'
const routes = [
	{
		path: '/',
		name: 'tasks',
		component: () => import('../views/TasksView.vue')
	},
	{
		path: '/tasks/:id',
		name: 'task',
		component: () => import('../views/SingleTaskView.vue'),
		props: true
	},
	{
		path: '/notes',
		name: 'notes',
		component: () => import('../views/NotesView.vue')
	},
	{
		path: '/add',
		name: 'add',
		component: () => import('../views/CreateView.vue')
	},
	{
		path: '/profile',
		name: 'profile',
		component: () => import('../views/ProfileView.vue')
	},
	{
		path: '/all&tasks/:title',
		name: 'all&tasks',
		component: () => import('../views/AllTasksView.vue'),
		props: true
	},
	{
		path: '/tasks/:id/edit',
		name: 'edit-task',
		component: () => import('../views/EditTasksView.vue'),
		props: true
	},
	{
		path: '/history',
		name: 'history',
		component: () => import('../views/HistoryView.vue')
	}

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
