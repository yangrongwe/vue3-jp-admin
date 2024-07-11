<template>
  <v-navigation-drawer
    color="navigation-drawer-background"
    :rail="rail"
    :permanent="!mobile"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <menu-list
      @mouseover="changeRail('focus')"
      @railChange="changeRail"
    ></menu-list>

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
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MenuList from '../menu/index.vue';
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();
const rail = ref<boolean>(false);
const changeRail = (type?: string) => {
  if (type === 'focus') {
    if (rail.value) {
      rail.value = false;
    }
  } else {
    // タブをクリックすると左側のメニューが開きます。
    // rail.value = false;
  }
};
</script>
