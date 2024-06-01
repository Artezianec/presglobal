import { createStore } from 'vuex';
const persistedUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { id: null, login: '' };

export default createStore({
    state: {
        user: persistedUser
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = { id: null, login: '' };
            localStorage.removeItem('user');
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user);
        },
        clearUser({ commit }) {
            commit('clearUser');
        }
    },
    getters: {
        userId: state => state.user.id,
        userLogin: state => state.user.login
    }
});
