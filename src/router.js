import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/LoginForm.vue';
import Chat from './components/ChatContainer.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/chat',
			name: 'chat',
			component: Chat
		},
		{
			path: '/',
			redirect: '/chat'
		}
	]
});
