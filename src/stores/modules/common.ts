import { defineStore } from 'pinia';

interface State {
  test: string
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): State => ({
    test: 'Hello!'
  }),
  getters: {
    //
  },
  actions: {
    getTest() {
      return this.test;
    }
  }
});
