<template>
  <u-card class="pa-4 mb-4">
    <Search title="Permission manager" :has-add="true" buttonName="add role" myLink="/role/0" @search="searchRole" />
    <div class="flex flex-col flex-1 w-full">
      <UTable
          ref="table"
          v-model:pagination="pagination"
          :data="store.roleList"
          :columns="columns"
          :ui="{
            th: 'py-1 px-2',
            td: 'py-1 px-2',

          }"
          :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
          class="flex-1"
      >
        <template #action-cell="{ row }">
          <div class="uppercase font-mono flex gap-1 items-center justify-end">
            <u-button color="info" size="sm" class="cursor-pointer"  variant="ghost" icon="i-heroicons-pencil-square" :to="'role/'+row.original.id" />
<!--            <u-button size="xs" icon="i-heroicons-pencil"  color="primary" variant="outline"></u-button>-->
            <u-switch size="xs" color="success" v-model="row.original.is_active" @change="switchActive(row.original)"> </u-switch>
          </div>
        </template>

        <template #permissions-cell="{ row }">
          <div class="uppercase font-mono ">
            <u-Badge class="mr-2" color="info"  variant="subtle" v-for="itx in row.original.permissions" :key="itx.id" > {{itx.name}}</u-Badge>
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
    </div>

  </u-card>


</template>

<script setup>
import {getPaginationRowModel} from "@tanstack/vue-table";

const UBadge = resolveComponent('UBadge')
const USwitch = resolveComponent('USwitch')
const table = useTemplateRef('table')
  const store = useRoleStore()

  const columns  = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'permissions', header: 'Permissions' },
    // {
    //   accessorKey: 'is_active',
    //   header: 'Status',
    //   cell: ({ row }) => {
    //     const value = row.getValue('is_active')
    //     const color = value ? 'success' : 'error'
    //     const label = value ? 'Active' : 'Inactive'
    //     return h(
    //         UBadge,
    //         {
    //           class: 'capitalize',
    //           variant: 'subtle',
    //           color,
    //         },
    //         () => label
    //     )
    //   }
    // },
    {
      id:"action",
      header: () =>
          h(
              "div",
              {
                // color: "neutral",
                // variant: "ghost",
                // icon: "i-lucide-menu",
                class: "text-right ",
              },
              "Actions"
          ),
    },
  ]

  const pagination = ref({
    pageIndex: 0,
    pageSize: 10
  });

const searchRole = () => {
  console.log('test')
}

const  switchActive = () => {

}

  store.findRole();
</script>
