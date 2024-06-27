<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      color="navigation-drawer-background"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="sandra_a88@gmailcom"
          title="Sandra Adams"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list v-model:opened="open" density="compact" nav color="primary">
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          :value="home"
          color="primary"
        ></v-list-item>

        <v-list-group value="Users">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="Users"
              @click.stop="rail = false"
            ></v-list-item>
          </template>

          <v-list-item
            style="padding-left: 45px !important"
            v-for="([title, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <div class="tw-border-t-2 tw-border-l-zinc-300">
          <v-icon
            :icon="!rail ? 'mdi-menu-open' : 'mdi-menu-close'"
            class="tw-mx-3 tw-my-2 tw-text-gray-400"
            @click.stop="rail = !rail"
          ></v-icon>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="app-bar-primary">
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(true);
const rail = ref(true);
const router = useRouter();
const open = ref(['Users']);
const home = ref('home');
const admins = ref([
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
]);

const menuItems = ref([
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    route: '/dashboard',
  },
  {
    title: 'Management',
    icon: 'mdi-folder',
    expanded: false,
    children: [
      { title: 'Users', icon: 'mdi-account', route: '/users' },
      { title: 'Settings', icon: 'mdi-cog', route: '/settings' },
    ],
  },
]);

const toggleExpand = (item) => {
  item.expanded = !item.expanded;
};

const navigate = (route) => {
  router.push(route);
  drawer.value = false;
};
</script>

<style scoped></style>
