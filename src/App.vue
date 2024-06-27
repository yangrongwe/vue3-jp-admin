<template>
  <div id="app">
    <v-locale-provider locale="ja">
      <router-view></router-view>
    </v-locale-provider>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    const logout = () => {
      authStore.logout();
    };

    return { isAuthenticated, logout };
  },
};
</script>

<style scoped></style>
