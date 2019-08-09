<template>
    <div>
      <hr>
      <h4>{{title}}</h4>
      <input :class="{ required: errors.has(designation) }" v-validate="condition" type="text" :name="designation">
      <br>
      <span :class="{ errTxt: errors.has(designation) }" v-if="errors.has(designation)" v-cloak>{{ errors.first(designation) }}</span>
    </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required : true //説明文
      },
      designation: { //name
        type: String,
        required: true
      },
      condition: { //条件
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  hr {
    border-top: 1px solid #999;
  }
</style>