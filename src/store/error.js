export default {
    state: {
        error: null,
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state, error) {
            state.error = null
        }
    },
    getters: {
        error: s => s.error
    }
}