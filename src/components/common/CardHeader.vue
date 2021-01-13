<template>
  <div class="card-header">
    <page-header :paths="paths"></page-header>
    <cap-card :title="title" :editable="editable">
      <div slot="subtitle">
        <slot name="subtitle"></slot>
      </div>

      <template v-if="custom">
        <slot></slot>
      </template>

      <template v-else>
        <common-form
          ref="formHeader"
          class="form-header"
          :label-width="labelWidth"
          :label-suffix="labelSuffix"
          :label-position="labelPosition"
          :form-items="formItems"
          :model="model"
          :editable="editable"
        >
          <slot name="form"></slot>
        </common-form>
      </template>
    </cap-card>

    <cap-card
      v-if="isShowUnder"
      :title="underTitle"
      :editable="editableUnder"
      :show-footer="showFooter"
    >
      <div slot="subtitle">
        <slot name="usbtitle"></slot>
      </div>

      <template v-if="underCustom">
        <slot name="under"></slot>
      </template>

      <template v-else>
        <slot name="hint"></slot>

        <common-form
          ref="underHeader"
          class="form-header"
          :label-width="labelWidth"
          :label-suffix="labelSuffix"
          :label-position="labelPosition"
          :form-items="underItems"
          :model="model"
          :editable="editableUnder"
        >
          <slot name="uform"></slot>
        </common-form>
      </template>

      <template slot="footer">
        <div class="card-footer" v-if="hasfooter">
          <el-button class="card-button primary-button" @click="confirm">{{
            buttonName
          }}</el-button>
          <el-button class="card-button cancel-button" @click="cancel"
            >取消</el-button
          >
        </div>
      </template>
    </cap-card>
  </div>
</template>

<script>
import CapCard from './CapCard';
import PageHeader from './PageHeader';
import commonForm from './common-form/index';

export default {
  // 组件名称
  name: 'cardHeader',
  // 组件参数 接收来自父组件的数据
  props: {
    paths: {
      type: Array,
      default: () => [],
    },
    tos: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    custom: {
      // 自定义有面包屑的内容
      type: Boolean,
      default: true,
    },
    model: {
      type: Object,
      default: () => ({}),
    },
    labelWidth: {
      type: String,
      default: '150px',
    },
    labelSuffix: {
      type: String,
      default: '：',
    },
    editable: {
      type: Boolean,
      default: true,
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    underItems: {
      type: Array,
      default: () => [],
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    underTitle: {
      type: String,
      default: '',
    },
    underCustom: {
      type: Boolean,
      default: true,
    },
    editableUnder: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    buttonName: {
      type: String,
      default: '',
    },
    backToPage: {
      type: String,
      default: '',
    },
    hasfooter: {
      type: Boolean,
      default: true,
    },
    warningObject: {
      type: Object,
      default: () => ({}),
    },
    showUnder: {
      type: Boolean,
      default: true,
    },
  },
  // 局部注册的组件
  components: { CapCard, PageHeader, commonForm },
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {
    isShowUnder() {
      if (!this.showUnder) {
        return false;
      }
      return this.warningObject === null ? false : true;
    },
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 校验
    formValidate() {
      this.$refs.formHeader.validate();
      this.$emit('fieldValid');
    },

    confirm() {
      this.$emit('submit');
    },

    cancel() {
      if (this['$route'].path === '/insertReleaseRiskWn') {
        this.$confirm('该页面未提交，是否确认退出？', '提示', {
          cancelButtonText: '否',
          confirmButtonText: '是',
          type: 'warning',
          distinguishCancelAndClose: true,
          isBindSave: false,
          callback: (action) => {
            if (action == 'confirm') {
              this.$router.push('/releaseOfRiskWarning');
            }
          },
        });
      } else {
        this.$confirm('退出页面前，是否保存编辑数据？', '提示', {
          cancelButtonText: '否',
          confirmButtonText: '是',
          type: 'warning',
          distinguishCancelAndClose: true,
          isBindSave: false,
          callback: (action) => {
            if (action == 'confirm') {
              this.$emit('cancel');
              // alert('保存数据')
              //  this.confirm ()
              // this.$parent.fatherMethod()//子组件调用父组件的方法
              //  this.$router.go(-1);
            } else if (action == 'cancel') {
              this.closeCurrentPage(() => {
                this.$router.push({ path: `/${this.backToPage}` });
              });
            }
          },
        });
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.card-footer {
  width: calc(100% - 40px);
  text-align: right;
  padding: 16px 20px;
}
.card-button {
  min-width: 93px;
  height: 29px;
  line-height: 28px;
  padding: 0;
}
.primary-button {
  background-color: #0172ee;
  border-color: #0172ee;
  color: #fff;
}
.primary-button:hover {
  background-color: #036cdd;
  border-color: #036cdd;
  color: #fff;
}
.cancel-button {
  background-color: #dad9dc;
  border-color: #dad9dc;
  color: #6a696b;
}
.cancel-button:hover {
  color: #6a696b;
  background-color: #d1d1d3;
}
</style>
