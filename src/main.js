import './assets/main.scss';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as vuetifyComponents from 'vuetify/components';
import * as vuetifyDirectives from 'vuetify/directives';
import { VDataTable } from 'vuetify/labs/VDataTable';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
  components: {
    ...vuetifyComponents,
    VDataTable,
  },
  directives: vuetifyDirectives,
});

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
