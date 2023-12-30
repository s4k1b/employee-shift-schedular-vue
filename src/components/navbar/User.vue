<script setup lang="ts">
import { useSnackbar } from '@/composables/snackbar';
import { signout$api } from '../../api/auth'
import { useUserStore } from '../../stores/user'
import { useRouter } from 'vue-router';

const { snackbar, showSnackbar } = useSnackbar()

const userStore = useUserStore()
const name = userStore.userValue.name

const router = useRouter();

async function logout() {
  const [resp, error] = await signout$api()
  if (error) {
    showSnackbar('error', error)
  } else {
    showSnackbar('success', resp)
    // clear user from store
    userStore.clearUser()
    // redirect to login page
    router.push('/login')
  }
}
</script>

<template>
  <div class="pa-5 text-center">
    <v-chip variant="tonal" color="primary" prepend-icon="mdi-account-circle">
      {{ name }}
    </v-chip>
    <v-btn @click.prevent="logout" density="comfortable" variant="tonal" color="red" icon="mdi-logout" class="ml-1" />
  </div>
  <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">{{ snackbar.message }}</v-snackbar>
</template>
