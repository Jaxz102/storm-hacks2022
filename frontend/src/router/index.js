import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Account from '../views/Account.vue'
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: Login
	},
	{
		path: '/dashboard',
		redirect: "/dashboard/account",
		name: 'dashboard',
		component: Dashboard,
		children:[
			{
				path: "account",
				component: Account,
			}
		]
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
