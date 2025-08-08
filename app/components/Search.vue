<script setup lang="ts">
import type {SearchProp} from "~/interfaces/saerch-prop.interface";
const router = useRouter()
const props = defineProps<SearchProp>()

const emit = defineEmits(
    ['search']
);
const kw = ref<string>('');

const goto = () => {
  router.push(props.myLink!)
}

const searchFunc = () => {
  emit('search', kw.value);
}

</script>

<template>
  <h1 class="mb-4 font-bold">{{ title }}</h1>
  <div class="flex justify-between gap-2 mb-4">
    <div class="flex items-center gap-1">
      <UInput class="max-w-sm w-[300px]" placeholder="Filter..." v-model="kw" @keydown.enter="searchFunc"/>
      <UButton class="cursor-pointer" color="info" icon="i-heroicons-magnifying-glass" variant="subtle"
               @click="searchFunc"/>
    </div>
    <UButton class="cursor-pointer" icon="solar:add-circle-broken" variant="subtle" @click="goto" v-if="hasAdd">
<!--      {{ buttonName }}-->
    </UButton>
  </div>
</template>

<style scoped lang="scss">

</style>