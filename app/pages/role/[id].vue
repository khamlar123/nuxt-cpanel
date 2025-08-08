<script setup lang="ts">
import * as v from 'valibot'
import {useRoleStore} from "~/stores/role-permission";
import type { CheckboxGroupItem } from '@nuxt/ui'
const router = useRouter();
const route = useRoute();
const store = useRoleStore();
const roleId = Number(route.params.id);

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Must be at least 2 characters')),
  permissions: v.pipe(v.array(v.number()), v.array(v.number())),
})

type Schema  = v.InferOutput<typeof schema>

const state = reactive({
  id: 0,
  name: '',
  is_active: true,
  permissions: [],
})
const goback  = useGoBack()


const onSubmit = () => {
    if (roleId === 0) {
      store.createRole(state, router);
    }else  {

      store.updateRole(roleId, state, router);
    }
}

const mapPermissionList =  computed(() =>{
  return store.permissionList.filter(f => f.is_active === true).map(m => { return { label: m.name, value: m.id } });
})

const items = ref<CheckboxGroupItem[]>(mapPermissionList)
onMounted(async () => {
  if (roleId > 0) {
    await store.findOneRole(roleId);
    const data = store.role;

    if (data ) {
      data.permissions =  data.permissions.map(m =>  m.id);
      Object.assign(state, data )
      console.log('state', state)
    }
  }

  await  store.findPermission();
})



</script>

<template>
  <u-card class="pa-4" >

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

      <UFormField label="Name" name="name" required>
        <UInput v-model="state.name" type="name" />

<!--        <a-checkbox-group  v-model:value="value" style="width: 100%; margin-top: 1rem" >-->
<!--          <a-row>-->
<!--            <a-col :span="8" v-for="item in mapPermissionList" :key="item.id">-->
<!--              <a-checkbox :value="item.id">{{item.name}}</a-checkbox>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--        </a-checkbox-group>-->
        <UCheckboxGroup class="mt-3" v-model="state.permissions" :items="items" />

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