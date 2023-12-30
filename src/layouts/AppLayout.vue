<script setup lang="ts">
import User from "../components/navbar/User.vue"
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Task Schedular">
      <user />
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <slot />
    </v-main>
  </v-layout>
</template>
