// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import lazyLoad from 'vue-lazyload'
import  VueAwesomeSwiper from 'vue-awesome-swiper'
import  'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

Vue.use(lazyLoad,{
    loading:'./static/loading.jpg'
})

Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
  
})
