<template>
  <div
    class="tw-bg-[url('@/assets/login/bg.jpg')] tw-bg-cover tw-h-screen tw-w-full tw-flex tw-justify-center tw-items-center"
  >
    <v-card
      class="tw-w-[480px] tw-mx-auto tw-pb-12 tw-px-8 login-card"
      elevation="2"
    >
      <jp-form
        ref="formRef"
        :form-options="formOptions"
        :form-data="formData"
      ></jp-form>
    </v-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue';
import JpForm from '@/components/JpForm/index.vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import logo from '@/assets/logo/logo.png';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import { VCard } from 'vuetify/components';
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
const formRef = ref(null);

const formData = reactive({
  email: '',
  password: '',
});
const formOptions = reactive<JpFormOptions>({
  formItems: [
    {
      itemType: 'image',
      itemName: 'logo',
      props: {
        src: logo,
        class: 'tw-mt-16 tw-w-[250px] tw-m-auto',
      },
      eventHandlers: {
        //
      },
    },
    {
      itemType: 'input',
      itemName: 'email',
      props: {
        type: 'email',
        defaultValue: 'admin@gmail.com',
        // label: 'email',
        variant: 'outlined',
        placeholder: 'Enter your email',
        prependInnerIcon: 'mdi-email-outline',
        class: 'tw-mt-4',
      },
      eventHandlers: {
        input: () => {},
      },
    },
    {
      itemType: 'input',
      itemName: 'password',
      props: {
        type: 'password',
        defaultValue: '123456',
        variant: 'outlined',
        placeholder: 'Enter your password',
        prependInnerIcon: 'mdi-lock-outline',
      },
      eventHandlers: {
        blur: (el) => {
          // formData.password = el.srcElement._value;
        },
        click: () => {
          // alert(123);
        },
      },
    },
    {
      itemType: 'customEl',
      itemName: 'memo',
      props: {
        class: 'tw-mb-4 tw-text-zinc-900 tw-bg-gray-300 tw-p-2',
        customContent: (
          <div>
            <div>ようこそ、ご利用いただきありがとうございます</div>
            <div>万事順調をお祈りします</div>
          </div>
        ),
      },
      eventHandlers: {
        //
      },
    },

    {
      itemType: 'button',
      itemName: 'button',
      props: {
        label: 'Login',
        color: 'blue',
        size: 'large',
        variant: 'tonal',
        block: true,
      },
      eventHandlers: {
        click: async () => {
          if (await formRef.value.validateForm()) {
            // 表单验证通过，进行提交操作
            console.log('Form submitted:', formData);
            login();
          } else {
            // 表单验证失败
            console.log('Form validation failed');
          }
        },
      },
    },
  ],
  rules: {
    email: [
      (value) => {
        if (value) return true;
        return 'You must enter email.';
      },
    ],
  },
});
</script>

<style scoped lang="scss">
.login-card {
  background-color: rgb(255 255 255 / 85%);
  border-radius: 5%;
}
</style>
