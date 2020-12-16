import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter.js'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Vuelidate from 'vuelidate'
import messagePlugin from '@/utilus/message.plugin'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)

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

