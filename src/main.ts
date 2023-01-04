import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';

import App from './App.vue';

import './assets/sass/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.config.warnHandler = () => { }; // 关闭提示

app.use(pinia);
app.use(router);
router.isReady().then(() => app.mount('#app'));

window.addEventListener('load', () => {
  // 添加service-worker.js
  if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
});
