<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import {useUserStore} from "~/stores/user.store";
const router = useRouter()
const store = useUserStore()
const table = useTemplateRef('table')
const kw = ref<string>('');
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

type Payment = {
  id: string
  date: string
  email: string
  amount: number
}

function handleEdit(item: any) {
  console.log('Edit clicked:', item)
  router.push({path: `/users/${item.id}`})
  // You can open modal, redirect, or do whatever you need here
}

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `# ${row.getValue('id')}`
  },
  {
    accessorKey: 'employee_id',
    header: 'employee id',
    // cell: ({ row }) => `#${row.getValue('employee_id')}`
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role.name',
    header: 'Role'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'is_active',
    header: 'status',
    cell: ({ row }) => {
      const value = row.getValue('is_active') as boolean

      const color = value ? 'success' : 'error'
      const label = value ? 'Active' : 'Inactive'

      return h(
          UBadge,
          {
            class: 'capitalize',
            variant: 'subtle',
            color,
          },
          () => label
      )
    }
  },
  {
    header: 'Actions',
    cell: ({row}) => {
      const original = row.original

      return h(
          'div',
          {class: 'flex gap-2'},
          [
            // h(UButton, {
            //   size: 'xs',
            //   icon: 'i-heroicons-eye',
            //   color: 'info',
            //   variant: 'outline',
            //   onClick: () => '',
            // }, () => ''),

            h(UButton, {
              size: 'xs',
              icon: 'i-heroicons-pencil',
              color: 'primary',
              variant: 'outline',
              onClick: () => edit(Number(row.original.id)),
            }, () => ''),

            h(UButton, {
              size: 'xs',
              icon: 'i-heroicons-lock-closed',
              color: 'error',
              variant: 'outline',
              onClick: () => '',
            }, () => '')
          ]
      )
    }
  }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
});

const searchFunc = () => {
 store.search(kw.value);
}

const edit = (id: number) => {
  router.push({path: `/users/${id}`})
}


store.find()

</script>

<template>
  <div class="w-full space-y-4 pb-4">

    <u-card class="pa-4">
      <h1 class="mb-2">User manager</h1>

      <div class="flex justify-between gap-2 mb-4">
          <div class="flex items-center gap-1">
            <UInput  class="max-w-sm" placeholder="Filter..."  v-model="kw"  @keydown.enter="searchFunc" />
            <UButton color="info" icon="i-heroicons-magnifying-glass" variant="subtle" @click="searchFunc" />
          </div>
        <UButton icon="ant-design:plus-circle-outlined" variant="subtle" to="users/0">Add User</UButton>
      </div>

      <UTable
          ref="table"
          v-model:pagination="pagination"
          :data="store.userList"
          :columns="columns"
          :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
          class="flex-1"
      >
      </UTable>

      <div class="flex justify-end border-t border-default pt-4">
        <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </u-card>


  </div>
</template>

<style scoped lang="scss">
.input-item{
  outline: none;
  padding: 2px 10px;
  border: 1px solid gainsboro;
  border-radius: 5px;
}
</style>
