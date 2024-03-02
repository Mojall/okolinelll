import { createStore } from 'vuex';


export default createStore({
    state() {
        return {
            isLoggedIn: false
        };
    },
    mutations: {
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
        }
    }
});
