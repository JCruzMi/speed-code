import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);

app.mount('#app');
