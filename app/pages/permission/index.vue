<script setup lang="ts">
import {getPaginationRowModel} from "@tanstack/vue-table";
const UBadge = resolveComponent('UBadge')
const USwitch = resolveComponent('USwitch')
const table = useTemplateRef('table')
const store = useRoleStore()
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
});


const columns  = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'name', header: 'Name' },

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

const switchActive = (event: any) => {
  store.permissionToggle(event.id);
}

const searchPermission = (event: string) => {
  store.searchPermission(event);
}

store.findPermission();
store.find();


const edit = (id: number) => {
  console.log('id', id)
    router.push(`/permission/${id}`);
}



</script>

<template>
  <u-card class="pa-4 mb-4">
    <Search title="Permission manager" :has-add="true" buttonName="add permission" myLink="/permission/0" @search="searchPermission" />
    <div class="flex flex-col flex-1 w-full">
      <UTable
          ref="table"
          v-model:pagination="pagination"
          :data="store.permissionList"
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
        <template #id-header="{header}">
          <div class="w-1">
            {{ header.id }}
          </div>
        </template>
        <template #id-cell="{ row }">
          <div class="flex flex-row gap-2 items-center w-1 ">
<!--            <u-chip class="w-1" :color="row.original.is_active ? 'success': 'error'" />-->
            <p>{{row.original.id}}</p>
          </div>
        </template>

        <template #toggle-cell="{ row }">
          <div class="uppercase font-mono ">
            <u-switch color="success" v-model="row.original.is_active" @change="switchActive(row.original)"> </u-switch>
          </div>
        </template>

        <template #action-cell="{ row }">
          <div class="flex gap-2 justify-end items-center">
            <u-button color="info" size="sm" class="cursor-pointer"  variant="ghost" icon="i-heroicons-pencil-square" :to="'permission/'+row.original.id" />
<!--            <u-button size="sm" class="cursor-pointer" color="error"  variant="ghost" icon="i-heroicons-trash" />-->
            <u-switch size="xs" color="success" v-model="row.original.is_active" @change="switchActive(row.original)"> </u-switch>
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
    .test{
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
</style>