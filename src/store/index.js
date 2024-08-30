import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null,
        tickets: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setTickets(state, tickets) {
            state.tickets = tickets
        }
    },
    actions: {
        async fetchTickets({ commit }) {
            const response = await fetch('http://127.0.0.1:8000/tickets/')
            const data = await response.json()
            commit('setTickets', data)
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getTickets(state) {
            return state.tickets
        }
    }
})
