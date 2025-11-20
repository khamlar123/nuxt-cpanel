<template>
  <div class="w-[100vw] h-[100vh] z-999 absolute top-0 left-0">
    <div class="flex items-center justify-center min-h-screen bg-gray-800 ">
      <UCard class="w-full max-w-sm">
        <template #header>
          <h1 class="text-xl font-semibold text-center">Login</h1>
        </template>

        <UForm :state="form" @submit="onSubmit">
          <UFormGroup label="Email" name="email" required >
            <UInput v-model="form.employee_id" type="text" placeholder="you@example.com" class="mb-4 w-full" />
          </UFormGroup>

          <UFormGroup label="Password" name="password" required class="mt-4">
            <UInput v-model="form.password" type="password" placeholder="••••••••" class="mb-2 w-full" />
          </UFormGroup>

          <UButton type="submit" class="mt-6 w-full" color="primary" block>
            Login
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-center text-sm">
            Don't have an account?
            <NuxtLink to="/register" class="text-primary hover:underline">Register</NuxtLink>
          </p>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import {useAuthStore} from "~/stores/auth.js";
import { Base64 } from 'js-base64';
const store = useAuthStore();
const router = useRouter()

const form = reactive({
  employee_id: '00000',
  password: '123456'
})

 const encodeBase64 = (plain) => {
   const encoded = Base64.encode(plain);
    return encoded
 }

const onSubmit = async () => {
  // try {
  //   // Simulate login
  //   if (form.email === 'lar' && form.password === '123456') {
  //     useCookie('token').value = 'dummy-token'
  //     alert('Login successful!')
  //     router.push('/')
  //   } else {
  //     alert('Invalid credentials')
  //   }
  // } catch (err) {
  //   console.error('Login error', err)
  // }

  form.password = encodeBase64(form.password);
 await store.login(form);
  console.log('token', store.token)
  useCookie('token').value = store.token;
  router.push('/')
}
</script>
