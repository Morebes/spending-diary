import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import datefilter from '@/filter/datefilter';

Vue.config.productionTip = false

Vue.filter("date", datefilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
