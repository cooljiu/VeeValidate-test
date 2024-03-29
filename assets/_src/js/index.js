import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import validationTpl from '../../comp/ValidationComp.vue';

import "../scss/index.scss";

Vue.use(VeeValidate);
//エラーメッセージ日本語化
Validator.localize('ja', ja);

const app = new Vue({
    el: '#app',
    data() {
        return {
            ValidationData: {
                //TODO
            }
      }  
    },
    components:{
        "my-comp": validationTpl
    },
    methods: {
    },
});