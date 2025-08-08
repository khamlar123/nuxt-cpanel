<script setup lang="ts">
import * as v from 'valibot'
import type {FormSubmitEvent} from "@nuxt/ui";
import {useRoleStore} from "~/stores/role-permission";
const router = useRouter();
const route = useRoute();
const permissionId = Number(route.params.id);
const store = useRoleStore();
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Must be at least 2 characters')),
})

type Schema  = v.InferOutput<typeof schema>

const state = reactive({
  name: '',
})
const goback  = useGoBack()

const onSubmit = (event: FormSubmitEvent<Schema>) => {
 if (permissionId === 0) {
   store.createPermission(event.data, router);
 }else {
   store.updatePermission(permissionId,event.data , router);
 }
}

onMounted(async () => {
    if (permissionId > 0) {
        await store.findOnePermission(permissionId);
        const data = store.permission;
        if (data) {
          Object.assign(state, data);
        }
    }
})
</script>

<template>
  <u-card class="pa-4" >

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

      <UFormField label="Name" name="name" required>
        <UInput v-model="state.name" type="name" />
      </UFormField>

      <div class="flex gap-2">
        <u-button  :loading="store.isLoading" class="w-[140px] flex items-center justify-center cursor-pointer"  icon="i-heroicons-inbox-arrow-down" label="submit" type="submit" color="success" variant="subtle"  />
        <u-button class="w-[140px] flex items-center justify-center cursor-pointer" type="button" color="error" label="Close" variant="subtle" @click="goback.goBack()" icon="i-heroicons-x-mark" />
      </div>
    </UForm>

  </u-card>
</template>

<style scoped lang="scss">

</style>