import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import error from './error'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,JPY`)
      return await res.json()
    }
  },
  modules: {
    auth, info, category, error, record
  }
})
