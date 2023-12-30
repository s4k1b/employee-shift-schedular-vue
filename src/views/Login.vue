<script setup lang='ts'>
import { signin$api } from '../api/auth'
import { useSnackbar } from '@/composables/snackbar';
import { required, email as emailValidation } from '@/plugins/validation-rules';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { snackbar, showSnackbar } = useSnackbar()

const email = ref('');
const password = ref('')

const router = useRouter();
const storeUser = useUserStore();

async function login() {
  const [resp, error] = await signin$api({ email: email.value, password: password.value })
  if (error) {
    showSnackbar('error', error)
  } else {
    showSnackbar('success', resp)

    // clear old store user and status
    storeUser.clearUser()
    
    // redirect to home page
    router.push('/')
  }
}
</script>

<template>
  <v-container>
    <v-sheet width="500" :border="2" elevation="10" class="mx-auto mt-15 rounded-lg pa-10" color="indigo-lighten-5">
      <v-form ref="form">
        <h1 class="mb-5 text-center">Login</h1>
        <v-text-field v-model="email" label="Email" type="email" :rules="[required, emailValidation]" />
        <v-text-field v-model="password" label="Password" type="password" :rules="[required]" />
        <div class="d-flex flex-column">
          <v-btn color="success" block @click="login">Sign In</v-btn>
        </div>
      </v-form>
    </v-sheet>

    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">{{ snackbar.message }}</v-snackbar>
  </v-container>
</template>
