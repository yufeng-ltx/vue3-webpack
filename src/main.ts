import { createApp } from 'vue';

import { store } from '@/store';
import { router } from './router';

import App from './App.vue';

import './assets/sass/main.scss';
import 'video.js/dist/video-js.min.css';

const app = createApp(App);

app.config.warnHandler = () => { }; // 关闭提示

app.use(store);
app.use(router);
router.isReady().then(() => app.mount('#app'));

window.addEventListener('load', () => {
  // 添加service-worker.js
  if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
});
