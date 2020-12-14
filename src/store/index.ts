import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

export const store = createStore({
  modules: {
    //
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
});
