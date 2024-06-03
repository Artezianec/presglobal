import {createStore} from 'vuex';

const persistedUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {id: null, login: '', onworkday: 0, workdays: [], onbreak: 0, price: 0};

export default createStore({
    state: {
        user: persistedUser,
        menu: 0,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = {id: null, login: ''};
            localStorage.removeItem('user');
        },
        setWorkDay(state, workDay) {
            state.user.onworkday = workDay;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        setMenu(state, menu) {
            state.menu = menu;
        },
        setUserWorkdays(state, workdays) {
            state.user.workdays = workdays;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        setUserOnBreak(state, onbreak) {
            state.user.onbreak = onbreak;
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    },
    actions: {
        setMenu({commit}, menu) {
            commit('setMenu', menu);
        },
        setUser({commit}, user) {
            commit('setUser', user);
        },
        clearUser({commit}) {
            commit('clearUser');
        },
        setWorkDay({commit}, workDay) {
            commit('setWorkDay', workDay);
        },
        setUserWorkdays({commit}, workdays) {
            commit('setUserWorkdays', workdays);
        },
        setUserOnBreak({commit}, onbreak) {
            commit('setUserOnBreak', onbreak);
        }
    },
    getters: {
        userId: state => state.user.id,
        userLogin: state => state.user.login,
        menu: state => state.menu,
        workDay: state => state.user.onworkday
    }
});
