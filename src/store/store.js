import { createStore } from 'vuex';

export default createStore({
    state () {
        return {
            isLoggedIn: false,
            user: null,
        };
    },
    mutations: {
        setLoggedIn (state, value) {
            state.isLoggedIn = value;
        },
        setUser (state, user) {
            state.user = user;
        },
    },
});
