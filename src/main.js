// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css'
import '@/globalCss/init.scss'//引入自己的初始化样式
import 'amfe-flexible/index'
import {fetch} from '@/utils/index'//引入axios
import api from '@/utils/api'//引入所有的api
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = fetch//挂载axios在vue实例上
Vue.prototype.$api = api//将api挂载到vue实例上

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
