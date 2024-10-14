import { QueryClient } from '@tanstack/react-query';
import stores from '../stores';

const uiStore = stores.uiStore;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onMutate: () => {
        uiStore.showLoading();
      },
      onSettled: () => {
        uiStore.hideLoading();
      },
    },
  },
});
