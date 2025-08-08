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
const USwitch = resolveComponent('USwitch')

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
    header: 'Employee',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('name')}`
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
    id: 'type',
    header: 'User type'
  },

  {
    id: 'action',
     header: 'Actions',
    // cell: ({row}) => {
    //   return h(
    //       'div',
    //       {class: 'flex gap-2'},
    //       [
    //         // h(UButton, {
    //         //   size: 'xs',
    //         //   icon: 'i-heroicons-eye',
    //         //   color: 'info',
    //         //   variant: 'outline',
    //         //   onClick: () => '',
    //         // }, () => ''),
    //
    //         h(UButton, {
    //           size: 'sm',
    //           icon: 'i-heroicons-pencil-square',
    //           color: 'primary',
    //           variant: 'ghost',
    //           onClick: () => edit(Number(row.original.id)),
    //         }, () => ''),
    //
    //         h(USwitch, {
    //           size: 'xs',
    //           color: 'success',
    //           variant: 'outline',
    //           modelValue: row.original.is_active,
    //           onChange: () => switchActive(row.original),
    //         }, () => '')
    //       ]
    //   )
    // }
  }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
});

const searchFunc = (event:string) => {
 store.search(event);
}

const edit = (id: number) => {
  router.push({path: `/users/${id}`})
}

const switchActive = (event: any) => {
  store.toggleStatus(event.employee_id)
}

store.find()

</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <u-card class="pa-4">
      <Search title="User manager" :has-add="true" buttonName="add user" myLink="/users/0" @search="searchFunc" />

      <UTable
          ref="table"
          v-model:pagination="pagination"
          :columns="columns"
          :data="store.userList"
          :ui="{
            th: 'py-1 px-2',
            td: 'py-1 px-2',

          }"
          :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
          class="flex-1"
      >
<!--        <template #status-cell="{ row }">-->
<!--          <div class="uppercase font-mono ">-->
<!--            <u-switch color="success" v-model="row.original.is_active" @change="switchActive(row.original)"> </u-switch>-->
<!--          </div>-->
<!--        </template>-->

        <template #action-cell="{ row }">
          <div class="uppercase font-mono flex gap-1 items-center justify-end">
            <u-button color="info" size="sm" class="cursor-pointer"  variant="ghost" icon="i-heroicons-pencil-square" :to="'users/'+row.original.id" />
            <!--            <u-button size="xs" icon="i-heroicons-pencil"  color="primary" variant="outline"></u-button>-->
            <u-switch size="xs" color="success" v-model="row.original.is_active" @change="switchActive(row.original)"> </u-switch>
          </div>
        </template>

        <template #type-cell="{ row }">
          <div class=" font-mono">
            <u-badge class="capitalize uppercase" variant="subtle" color="info">{{row.original.is_admin ? 'Admin' : 'User'}}</u-badge>
          </div>
        </template>

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
