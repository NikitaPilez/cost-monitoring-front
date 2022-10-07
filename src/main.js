import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import 'vuetify/dist/vuetify.min.css'
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  wsPort: process.env.VUE_APP_PUSHER_APP_PORT,
  wssPort: process.env.VUE_APP_PUSHER_APP_PORT,
  wsHost: process.env.VUE_APP_WEBSOCKET_URL,
  forceTLS: false,
  disableStats: true,
});

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
