import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
Vue.use(Vuetify)
/*import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify : new Vuetify(),
  render: function (h) { return h(App) }
}).$mount('#app')