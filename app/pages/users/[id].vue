<script setup lang="ts">
  import {getPaginationRowModel} from "@tanstack/vue-table";
  const { success, error, warning } = Alert
  const UBadge = resolveComponent('UBadge')
  const USwitch = resolveComponent('USwitch')
  const route = useRoute()
  const id = route.params.id
  const store = useRoleStore()
  const pagination = ref({
    pageIndex: 0,
    pageSize: 5
  });

  const columns  = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'is_active',
      header: 'Status',
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
      id:"action"
      // cell: ({ row }) => {
      //   const value = row.original.is_active // or row.getValue('is_active')
      //   const id = row.original.id
      //
      //   return h(USwitch, {
      //     modelValue: value,
      //     // called when switch toggled
      //     'onUpdate:modelValue': (newValue: boolean) => {
      //       // Emit an event or directly update your store/list
      //       console.log('Toggle:', id, newValue)
      //       const index = store.permissionList.findIndex(f => f.id === id)
      //       if (index !== -1) {
      //         store.permissionList[index].is_active = newValue
      //       }
      //
      //       // Example: update your store or API here
      //       // store.toggleUserStatus(id, newValue)
      //     },
      //   })
      // }
    },
  ]

  const showToast = () => {
    success('test')
  }

  const switchActive = (event: any) => {
    store.permissionToggle(event.id);
  }

  store.findPermission();

</script>

<template>
<u-card class="pa-4">
  <h1>Permission</h1>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput  class="max-w-sm" placeholder="Filter..." />
    </div>

    <UTable
        ref="table"
        v-model:pagination="pagination"
        :data="store.permissionList"
        :columns="columns"
        :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
        class="flex-1"
    >
      <template #action-cell="{ row }">
        <div class="uppercase font-mono ">
          <u-switch color="success" v-model="row.original.is_active" @change="switchActive(row.original)"> </u-switch>
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

<style scoped lang="scss">

</style>