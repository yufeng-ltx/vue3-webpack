declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module 'ant-design-vue/es/locale/zh_CN';

declare module 'video.js';
