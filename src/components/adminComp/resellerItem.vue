<template>
  <div class='mainItem' style="background: white; margin: 3px">
      <p>{{ message }}</p>
      <button v-show="approve" @click="approve(approveParam)">Approve</button>
      <button v-show="reject" @click="reject(rejectParam)">Delete</button>
  </div>
</template>

<script>
export default {
    name: 'resllerItem',
    props: {
        reject: Function,
        rejectParam: String,
        approve: Function,
        approveParam: String,
        message: String
    }
}
</script>

<style scoped>
.mainItem * {
    display: inline-block;
}
</style>