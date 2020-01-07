import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuelidate from 'vuelidate'
import dateFilter from '@/filter/date.filter'
import currencyFilter from '@/filter/currency.filter'
import store from './store'
import messagePlagin from '@/utils/message.plagin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'


import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter("date", dateFilter)
Vue.filter("currency", currencyFilter)
Vue.use(vuelidate)
Vue.use(messagePlagin)
Vue.component('Loader', Loader)


let app

firebase.initializeApp({
  apiKey: "AIzaSyCVhOs6q2DF61Hrlc9FqaThXJ4RHjiS7zo",
  authDomain: "vue-stady.firebaseapp.com",
  databaseURL: "https://vue-stady.firebaseio.com",
  projectId: "vue-stady",
  storageBucket: "vue-stady.appspot.com",
  messagingSenderId: "618907157413",
  appId: "1:618907157413:web:446b1e0d4609ebae139e4c",
  measurementId: "G-JFLNZ05YKH"
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})
