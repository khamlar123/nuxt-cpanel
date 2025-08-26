<script setup lang="ts">
import * as v from 'valibot'
import type {FormSubmitEvent} from '@nuxt/ui'
import {useRoleStore} from "~/stores/role-permission";
import {useUserStore} from "~/stores/user.store";

const route = useRoute();
const router = useRouter();
const userId: number = Number(route.params.id);
const store = useRoleStore();
const userStore = useUserStore()


let schema = null;
  if (userId > 0 ) {
     schema = createUserSchema(false);
  }else {
     schema = createUserSchema(true);
  }

function createUserSchema(requirePassword = true) {
  return v.object({
    email: v.pipe(v.any()),
    password: requirePassword
        ? v.pipe(v.string(), v.minLength(6, 'Must be at least 6 characters'))
        : v.pipe(v.any() ),
    employee_id: v.pipe(v.string(),  v.minLength(5, 'Must be at least 5 characters')),
    role: v.pipe(v.string()),
    name: v.pipe(v.string()),
    branch_id: v.pipe(v.number(), v.minValue(1, 'Please branch')),
    is_admin: v.pipe(v.boolean()),
    phone: v.pipe(v.any() ),
  })
}


type Schema = v.InferOutput<typeof schema>


const state = reactive({
  email: '',
  password: '',
  employee_id: '',
  role: 'USER',
  name: '',
  branch_id: 0,
  is_admin: false,
  phone: '',
})


const roleOptions = computed(() => {
return store.roleList.filter(f => f.is_active === true).map(m => {
    return {
      label: m.name,
      value: m.id,
    }
  })
})

const branchOption = computed(() => {
  return store.branchList.map(b => {
    return {
      label: b.name,
      value: b.code
    }
  })
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (userId > 0 ) {
    if ( event.data.password === '' ) {
      delete event.data.password; // Remove password if not provided
    }
    userStore.update(userId,event.data, router)
  } else  {
    userStore.create(event.data, router)
  }
}

const close = () => {
  useGoBack().goBack()
}

onMounted(async () => {
  if (userId > 0 ) {
   await userStore.findOne(userId);
   const data = userStore.user;
   if (data) {
     delete data.password
     Object.assign(state, data);
   }
  }

  await store.find();
  await store.branch();
})

const items = ref(['USER', 'ADMIN'])
</script>

<template>
  <UCard class="overflow-visible relative z-50">

    <h1 class="mb-4 font-bold">Add User</h1>

    <div class="relative overflow-visible">
      <UForm class="space-y-4 grid grid-cols-2" :schema="schema" :state="state" @submit="onSubmit">

        <UFormField label="Name" name="name">
          <UInput v-model="state.name" placeholder="Enter name"/>
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="Enter email" type="email"/>
        </UFormField>

        <UFormField label="Password" name="password"  required >
          <UInput v-model="state.password" type="password" placeholder="Enter password" />
        </UFormField>

        <UFormField label="Phone" name="phone">
          <UInput v-model="state.phone" placeholder="Enter phone"/>
        </UFormField>

        <UFormField label="Employee ID" name="employee_id" required>
          <UInput v-model="state.employee_id" placeholder="Enter employee ID"/>
        </UFormField>

        <div class="relative z-50">
<!--          <UFormField label="Role" name="role_id" required>-->
<!--            <u-select-->
<!--                v-model="state.role_id"-->
<!--                :items="roleOptions"-->
<!--                class="w-[190px]"-->
<!--                placeholder="&#45;&#45; select role &#45;&#45;"-->
<!--            ></u-select>-->
<!--          </UFormField>-->

          <UFormField label="Role" name="role" required>

              <USelect v-model="state.role" :items="items" class="w-48" />

          </UFormField>

        </div>

        <div class="relative z-50">
          <UFormField label="branch" name="branch_id" required>
            <u-select
                v-model="state.branch_id"
                :items="branchOption"
                class="w-[190px]"
                placeholder="-- select branch --"
            ></u-select>
          </UFormField>
        </div>

        <UFormField label="Is Admin?" name="is_admin">
          <USwitch v-model="state.is_admin"/>
        </UFormField>

        <div class="flex gap-2">
          <UButton  :loading="store.isLoading" icon="i-heroicons-inbox-arrow-down" type="submit" label="Submit" color="primary" variant="subtle"
                   class="w-[140px] flex items-center justify-center cursor-pointer"   />
          <UButton icon="i-heroicons-x-mark" type="button" label="Close" color="error" variant="subtle"
                   class="w-[140px] flex items-center justify-center cursor-pointer" @click="close"/>
        </div>
        <div></div>
      </UForm>
    </div>

  </UCard>
</template>