<script setup lang="ts">
import * as v from "valibot";
import {useImportStore} from "~/stores/import";
import moment from "moment";

const canChangeDate = ref(true);
const minDate = ref<string>();
const maxDate = ref<string>();
const store = useImportStore()
const checkTaskArray = ref<boolean[]>([]);


const schema = v.object({
  select_table: v.pipe(v.string()),
  start: v.pipe(v.string(), v.minLength(8, 'Must be  put date format is yyyymmdd')),
  end: v.pipe(v.string(), v.minLength(8, 'Must be put date format is yyyymmdd')),
})

type Schema  = v.InferOutput<typeof schema>

const importDate = reactive({
  select_table: 'select Table',
  start: '',
  end: '',
})

const tables: string[] = [
    'loan', 'sector-bal', 'bol-loan', 'income', 'expense', 'deposit', 'admin', 'liquidity', 'liquidity-exchange', 'liquidity-nop', 'reseve', 'liquidity-cap-asset'
]

const onSubmit = () => {
  const start = moment(importDate.start).format('YYYYMMDD');
  const end = moment(importDate.end).format('YYYYMMDD');
  store.importLoan(start, end, importDate.select_table);
  checkTask()
}

const formatDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD')
}

const checkData = (inputDate: string): boolean => {
  const checkDate =  moment().add(-1, 'd').format('YYYYMMDD') === inputDate;
  return checkDate;
}

const change =() => {
  minDate.value = moment(store.dates[importDate.select_table]).add(1, 'd').format('YYYY-MM-DD')
  maxDate.value = moment().add(-1, 'd').format('YYYY-MM-DD')
  canChangeDate.value = false;
}

const checkTask = () => {
  checkTaskArray.value.push(checkData(store.dates?.loan))
  checkTaskArray.value.push(checkData(store.dates?.['sector-bal']))
  checkTaskArray.value.push(checkData(store.dates?.['bol-loan']))
  checkTaskArray.value.push(checkData(store.dates?.income))
  checkTaskArray.value.push(checkData(store.dates?.expense))
  checkTaskArray.value.push(checkData(store.dates?.deposit))
  checkTaskArray.value.push(checkData(store.dates?.admin))
  checkTaskArray.value.push(checkData(store.dates?.liquidity))
  checkTaskArray.value.push(checkData(store.dates?.['liquidity-exchange']))
  checkTaskArray.value.push(checkData(store.dates?.['liquidity-nop']))
  checkTaskArray.value.push(checkData(store.dates?.reseve))
  checkTaskArray.value.push(checkData(store.dates?.['bd_ass_lia_cap']))
}
checkTask()

store.checkImport()
</script>

<template>
  <pre>{{disBtn}}</pre>
  <UCard class="pa-4">
    <h1 class="mb-4 font-bold">Import</h1>
    <UForm :schema="schema" :state="importDate" class="space-y-4" @submit="onSubmit">
      <!--    <UInput v-maska="'#### #### #### ####'" placeholder="4242 4242 4242 4242" icon="i-lucide-credit-card" />-->
      <div class="flex items-center gap-2">

        <UFormField label="Select Table" name="select_table" required>
          <USelectMenu v-model="importDate.select_table" :items="tables" class="w-48" @change="change" />
        </UFormField>

        <UFormField label="Start" name="start" required >
          <UInput :disabled="canChangeDate" type="date" :min="minDate" :max="maxDate"  placeholder="YYYYMMDD" icon="i-lucide-calendar" v-model="importDate.start" required />
        </UFormField>

        <UFormField label="End" name="end" required >
          <UInput :disabled="canChangeDate" type="date" :min="minDate" :max="maxDate"  placeholder="YYYYMMDD" icon="i-lucide-calendar" v-model="importDate.end" required />
        </UFormField>

        <div class="flex flex-col mt-6">
          <UButton icon="ic:baseline-cloud-download" type="submit" color="info"  :loading="store.isLoading" />
        </div>
      </div>
    </UForm>
    <div class="flex flex-col">
      <h1 class="mt-4">Your task</h1>
      <u-button class="mt-4" v-if="!checkData(store.dates?.loan)" color="error"  variant="subtle" >loan last import is : {{ formatDate(store.dates?.loan)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.['sector-bal'])" color="error"  variant="subtle" >sector bal last import is : {{ formatDate(store.dates?.['sector-bal'])}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.['bol-loan'])"  color="error"  variant="subtle" >bol loan last import is : {{ formatDate(store.dates?.['bol-loan'])}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.income)" color="error" variant="subtle" >income last import is : {{ formatDate(store.dates?.income)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.expense)" color="error" variant="subtle" >expense last import is : {{ formatDate(store.dates?.expense)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.deposit)" color="error" variant="subtle" >deposit last import is : {{ formatDate(store.dates?.deposit)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.admin)" color="error" variant="subtle" >admin last import is : {{ formatDate(store.dates?.admin)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.liquidity)" color="error" variant="subtle" >Liquidity last import is : {{ formatDate(store.dates?.liquidity)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.['liquidity-exchange'])" color="error" variant="subtle" >Liquidity exchange last import is : {{ formatDate(store.dates?.['liquidity-exchange'])}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.['liquidity-nop'])" color="error"  variant="subtle" >Liquidity nop last import is : {{ formatDate(store.dates?.['liquidity-nop'])}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.reseve)" color="error" variant="subtle" >reseve last import is : {{ formatDate(store.dates?.reseve)}} </u-button>
      <u-button class="mt-4" v-if="!checkData(store.dates?.['bd_ass_lia_cap'])" color="error" variant="subtle" >bd ass lia cap last import is : {{ formatDate(store.dates?.bd_ass_lia_cap)}} </u-button>
    </div>

  </UCard>



</template>

