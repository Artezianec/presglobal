import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '..//components/LoginForm.vue';
import UserProfile from '..//components/UserProfile.vue';

const routes = [
    {
        path: '/',
        name: 'LoginRegister',
        component: LoginRegister
    },
    {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
