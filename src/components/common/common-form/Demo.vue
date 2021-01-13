<template>
  <div style="background: #ffffff">
    <common-form
      ref="demoForm"
      label-width="100px"
      :form-items="formItems"
      :model="model"
    >
      <el-input slot="test"></el-input>
    </common-form>
    <common-form
      ref="demoForm"
      label-width="100px"
      :form-items="formItems"
      :editable="false"
      :model="model"
    ></common-form>
  </div>
</template>

<script>
import commonForm from './index';
import gtcsSelect from '../CodeDropDown';
export default {
  name: 'Demo',
  components: { commonForm, gtcsSelect },
  props: {},
  created() {},
  mounted() {
    // this.$refs.demoForm.validate();
    // setInterval(() => {
    //   this.$refs.demoForm.toggleShow();
    // }, 2000);
  },
  data() {
    return {
      model: {},
      //默认的布局配置
      // colOptions: {
      //   //  span:6
      // },
      formItems: [
        {
          /*el-form-item上的属性*/
          options: { label: '时间', prop: 'time', required: true },
          visible: false,
          /*表单组件配置*/
          component: {
            /*组件名称*/
            name: 'el-input',
            /*组件属性*/
            options: { clearable: true },
            /*组件事件*/
            events: {}
          }
        },
        {
          options: { label: '地点', prop: 'address' },
          component: {
            name: 'el-input',
            options: { clearable: true }
          }
        },
        {
          options: { label: '人物', prop: 'person' },
          component: {
            name: 'el-input',
            options: { clearable: true }
          }
        },
        {
          colOptions: { span: 24 },
          options: { label: '经过', prop: 'person' },
          component: {
            name: 'el-input',
            options: { clearable: true, type: 'textarea' }
          }
        },
        {
          options: { label: '地点', prop: 'address' },
          component: {
            /*局部注册的组件，直接传入引入的组件变量*/
            name: gtcsSelect,
            options: { clearable: true }
          }
        },
        {
          options: { label: 'test', prop: 'test' }
          // component: {
          //   /*局部注册的组件，直接传入引入的组件变量*/
          //   name: gtcsSelect,
          //   options: { clearable: true }
          // }
        }
      ]
    };
  },
  methods: {},
  computed: {}
};
</script>

<style scoped></style>
