import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter.js'
import currencyFilter from './filters/currency.filter'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Vuelidate from 'vuelidate'
import messagePlugin from '@/utilus/message.plugin'
import Loader from '@/components/Loader'
import toolTipDirective from './directives/tooltip.directive'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Paginate from 'vuejs-paginate'


Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', toolTipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyCtIeLIDpeaSS9YTnGaESaLeIkexGuQ63I",
  authDomain: "crmsistem-vue.firebaseapp.com",
  projectId: "crmsistem-vue",
  storageBucket: "crmsistem-vue.appspot.com",
  messagingSenderId: "977204460229",
  appId: "1:977204460229:web:aa7310cfd33c7482bd8eac",
  measurementId: "G-JSWTL00J3N"
};

firebase.initializeApp(firebaseConfig);

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

