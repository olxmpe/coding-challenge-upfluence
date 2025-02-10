<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
  selected: boolean;
}>();
</script>
<template>
  <div class="flex button" :class="{ active: props.selected }">
    <div class="checkbox" :class="{ active: props.selected }"></div>
    {{ props.label }}
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  height: 1rem;
  width: 1rem;
  border: solid 1px var(--color-grey);
  border-radius: var(--button-border-radius);

  &.active {
    border: none;
    background: var(--color-blue);
  }
}
</style>
