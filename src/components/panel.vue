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
    /* border-radius: 10px; */
    /* background: linear-gradient(145deg, #f8ffff, #d1d7dc); */
    background: #ffffff;
    box-shadow: 9px 9px 23px #b7bdc1, 
            -9px -9px 23px #ffffff;
    padding: 15px;
    width: fit-content;
    height: fit-content;
}
</style>