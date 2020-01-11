import firebase from 'firebase/app'

export default {
    actions: {
        async createRecord({ dispatch, commit }, record) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecord({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid')
                const record = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

                return Object.keys(record).map(key => ({ ...record[key], id: key }))


            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}