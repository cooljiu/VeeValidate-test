<template>
    <div>
      <hr>
      <h4>{{title}}</h4>
      <input :class="{ required: errors.has(designation) }" v-validate="condition" type="text" :name="designation">
      <br>
      <transition name="v-fade"><span :class="{ errTxt: errors.has(designation) }" v-if="errors.has(designation)" v-cloak>{{ errors.first(designation) }}</span></transition>
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
  .v-fade-enter-active, .v-fade-leave-active {
    transition: opacity .5s;
  }
  .v-fade-enter, .v-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>