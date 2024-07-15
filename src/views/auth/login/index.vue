<template>
  <div
    class="tw-bg-[url('@/assets/login/bg.jpg')] tw-bg-cover tw-h-screen tw-w-full tw-flex tw-justify-center tw-items-center"
  >
    <v-card class="tw-w-[480px] tw-mx-auto login-card" elevation="2">
      <jp-form :form-options="formOptions"></jp-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import JpForm from '@/components/JpForm/index.vue';
import type JpFormOptions from '@/components/JpForm/type.ts';
import logo from '@/assets/logo/logo_transparent.png';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
// import { userLogin } from '@/api/user';
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  // const response: any = await userLogin({
  //   account: 'admin',
  //   password: '123456',
  // });
  const response = {
    user: {
      userId: '1001',
      name: '田中　太郎',
      email: 'taro@wxcorer.com',
      avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
      role: 'admin',
    },
    errorCode: null,
    errorMessage: '',
  };

  if (!response.errorCode) {
    authStore.login(response.user);
    router.push('/dashboard');
  }
};
const formOptions = reactive<JpFormOptions>({
  type: 'vuetify',
  formItems: [
    {
      itemType: 'image',
      itemName: '',
      labelPosition: 'center',
      imagePath: logo,
      width: 200,
    },
    {
      itemType: 'text',
      itemName: '',
      labelPosition: 'left',
      prependInnerIcon: 'mdi-email-outline',
    },
    {
      itemType: 'password',
      itemName: '',
      labelPosition: 'left',
      visible: false,
    },
    {
      itemType: 'cardText',
      itemName: '',
      labelPosition: 'left',
    },
    {
      itemType: 'button',
      itemName: 'Login',
      clickMethod: login,
    },
  ],
  rules: [],
});
</script>

<style scoped lang="scss">
.login-card {
  background-color: rgb(255 255 255 / 85%);
  border-radius: 5%;
}
</style>
