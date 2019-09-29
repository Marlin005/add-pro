import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import BuyModalComponent from '@/components/shared/BuyModal'

import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
	   theme:{
      primary: colors.red.darken1	  
	  }
  // {
  //    primary: "#f44336",
  //     secondary: "#9575CD",
  //     accent: "#9c27b0",
  //     error: "#f44336",
  //     warning: "#3949AB",
  //    info: "#2196f3",
  //    success: "#4caf50"
  //   }
	
  // theme: {
  //   primary: colors.lightGreen.darken2,
  //   secondary: colors.lime.accent4,
  //   accent: colors.lightGreen.accent4,
  //   error: colors.red.darken1,
  //   warning: colors.yellow.accent3,
  //   info: colors.blue.base,
  //   success: colors.green.base
  // }
})
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // один из жизненных циклов
  created () {
    firebase.initializeApp({
      apiKey: 'YOUR apiKey',
	  authDomain: 'itc-ads-54f47.firebaseapp.com',
      databaseURL: 'https://itc-ads-54f47.firebaseio.com',
      projectId: 'itc-ads-54f47',
      storageBucket: 'itc-ads-54f47.appspot.com',
      messagingSenderId: '1020431181142'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
