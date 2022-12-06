import 'reflect-metadata';

import Vue from 'vue';

// in this file (probably only in this file) we must include the .vue extension or typescript won't know how to find the file
import App from '@/App.vue';

new Vue({
  render: h => h(App),
  components: { App },
  template: '<App/>',
}).$mount('#app');
