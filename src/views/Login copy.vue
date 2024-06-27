<template>
  <div class="login">
    <h1 class="text-3xl font-bold underline">Login Page</h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';

export default {
  name: 'Login',
  setup() {
    const authStore = useAuthStore();

    const login = () => {
      const user = { name: 'John Doe' };
      const roles = ['admin'];
      authStore.login(user, roles);
    };

    return { login };
  },
};
</script>

<style scoped>
/* 添加 Login 组件的样式 */
</style>
