<script setup lang="ts">
import { ref } from 'vue';
import { signup$api } from '../api/auth'
import type { VForm } from 'vuetify/components';
import { required, email as emailValidation, minLength } from "../plugins/validation-rules"
import { useSnackbar } from "../composables/snackbar"

const form = ref<VForm | null>(null);

const { snackbar, showSnackbar } = useSnackbar()

const name = ref('');
const email = ref('')
const phone = ref('')
const password = ref('')
const rePassword = ref('')
async function signup() {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (valid) {
      const ctx = {
        phone: phone.value,
        name: name.value,
        email: email.value,
        password: password.value
      }
      const [resp, error] = await signup$api(ctx)
      if (!error) {
        showSnackbar('success', resp)
      } else {
        showSnackbar('error', error)
      }
    }
  }

}
</script>

<template>
  <v-container>
    <v-sheet width="500" :border="2" elevation="10" class="mx-auto mt-15 rounded-lg pa-10" color="indigo-lighten-5">
      <v-form ref="form">
        <h1 class="mb-5 text-center">Register</h1>
        <v-text-field color="secondary" v-model="name" label="Name" :rules="[required]" />
        <v-text-field v-model="email" label="Email" type="email" :rules="[required, emailValidation]" />
        <v-text-field v-model="phone" label="Mobile / Phone No." :rules="[]" type="tel" />
        <v-text-field v-model="password" label="Password" type="password" :rules="[required, minLength(8)]" />
        <v-text-field v-model="rePassword" label="Retype Password" type="password"
          :rules="[(s) => (s === password) || 'Passwords do not match']" />
        <div class="d-flex flex-column">
          <v-btn color="success" block @click="signup">Sign Up</v-btn>
        </div>
      </v-form>
    </v-sheet>

    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">{{ snackbar.message }}</v-snackbar>
  </v-container>
</template>
