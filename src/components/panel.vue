<template>
  <div class="panel">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'panel'
}
</script>

<style scoped>
.panel {
    border-radius: 10px;
    background-color: #0a439a;
    padding: 15px;
    width: fit-content;
    height: fit-content;
    color: white;
}
</style>
