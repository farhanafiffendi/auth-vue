import { createStore } from "vuex";

export default createStore({
    state: {
        isUser: false,
        user: {},
        isAdmin: false,
    },
    mutations:{
        setUser(state, status) {
            state.isUser = status;
        },
        getUser(state, payload){
            state.user = payload
        }
    }
})
