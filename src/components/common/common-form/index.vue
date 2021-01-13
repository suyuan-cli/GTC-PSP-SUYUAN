<template>
  <el-form
    v-bind="options"
    ref="commonForm"
    :class="['common-form', { 'uneditable-form': !editable }]"
  >
    <el-row v-for="(row, $index) in renderFormItems" :key="$index">
      <template v-for="(item, $key) in row">
        <el-col v-bind="item.colOptions" :key="$key" v-show="item.visible">
          <el-form-item v-bind="item.options">
            <slot :name="item.options.prop" :slot-scope="item.component">
              <component
                v-if="editable && item.component"
                v-bind:is="item.component.name"
                v-bind="item.component.options"
                v-on="item.component.events"
                :ref="item.options.prop"
                v-model="options.model[item.options.prop]"
              ></component>
              <template v-else>
                {{
                  formatValue(
                    options.model[item.options.prop],
                    options.model,
                    item,
                    item.formatter
                  )
                }}
              </template>
            </slot>
            <template slot="label">
              <slot :slot-scope="item" :name="item.options.prop + '-label'">
                <span style="position: relative">
                  <el-tooltip
                    v-if="item.options.hasOwnProperty('tooltip')"
                    :content="item.options.tooltip"
                    placement="top"
                  >
                    <i class="el-icon-warning"></i>
                  </el-tooltip>
                  {{ item.options.label + options.labelSuffix }}
                </span>
              </slot>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { Form } from 'element-ui';
export default {
  name: 'common-form',
  components: {},
  props: {
    ...Form.props,
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelSuffix: {
      type: String,
      default: '：'
    },
    /*
     * {
     *   colOptions:布局配置，
     *   options：form元素配置；el-form-item的Attributes，
     *   visible: 是否显示，
     *   component：表单内的组件：{
     *      name:组件名，
     *      options：组件属性
     *      events：组件事件
     *   }
     * }
     * */
    formItems: {
      type: Array
    },
    colOptions: {
      type: Object,
      default() {
        return {
          span: 8
        };
      }
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.formItems.forEach(item => {
      if (item.visible !== undefined) {
        this.toggleProp.push(item.options.prop);
      }
    });
    // this.init();
  },
  mounted() {
    this.bindMethods('commonForm');
  },
  updated() {},
  data() {
    return {
      toggleProp: []
    };
  },
  methods: {
    init() {
      this.formItems.forEach(item => {
        /* 设置默认的列布局配置 */
        item.colOptions = item.colOptions || {};

        if (item.visible === undefined) {
          item.visible = true;
        }
        this.setDefValue(item.colOptions, this.colOptions);
        if (item.component !== undefined) {
          // 设置通用非空校验信息
          item.component.options = item.component.options || {};
          this.setDefValue(item.component.options, {
            style: { width: '100%' }
          });
          this.setRequired(item);
        }
      });
    },
    toggleShow(visible = null) {
      this.formItems.forEach(item => {
        if (this.toggleProp.includes(item.options.prop)) {
          if (visible === null) {
            item.visible = !item.visible;
          } else {
            item.visible = visible;
          }
        }
      });
    },
    setItemVisible(props, visible) {
      this.formItems.forEach(item => {
        if (props.includes(item.options.prop)) {
          item.visible = visible;
        }
      });
    },
    setRequired(item) {
      if (item.options.required) {
        if (!Array.isArray(item.options.rules)) item.options.rules = [];
        if (
          item.options.rules.length > 0 &&
          item.options.rules[0].hasOwnProperty('required')
        ) {
          item.options.rules.splice(0, 1);
        }
        item.options.rules.splice(0, 0, {
          required: true,
          validator(rule, value, callback) {
            if (
              value === null ||
              value === undefined ||
              (typeof value === 'string' && value.trim() === '') ||
              (Array.isArray(value) && value.length === 0)
            ) {
              callback(new Error(`${item.options.label}不能为空`));
            } else {
              callback();
            }
          }
        });
      } else {
        if (
          Array.isArray(item.options.rules) &&
          item.options.rules.length > 0 &&
          item.options.rules[0].hasOwnProperty('required')
        ) {
          item.options.rules.splice(0, 1);
        }
      }
    },
    setVisibleByMode(item) {
      if (this.editable && item.hasOwnProperty('showFor')) {
        item.visible = item.showFor === 'normal';
      }
      if (!this.editable && item.hasOwnProperty('showFor')) {
        item.visible = item.showFor === 'detail';
      }
    },
    formatValue(value, model, options, formatter = null) {
      if (typeof formatter !== 'function') return value;
      return formatter(value, model, options);
    },
    setModelKey() {
      this.formItems.forEach(item => {
        if (!this.model.hasOwnProperty(item.options.prop)) {
          this.$set(this.model, item.options.prop, null);
        }
      });
    }
  },
  computed: {
    options() {
      let options = {};
      Object.keys(Form.props).forEach(key => {
        options[key] = this.$props[key];
      });
      options.labelSuffix = this.editable ? '' : '：';
      return options;
    },
    renderFormItems() {
      this.init();
      let items = [];
      let row = [];
      let sum = 0;
      // this.setModelKey();
      this.formItems.forEach(item => {
        this.setVisibleByMode(item);
        if (item.visible === false) return;
        let { span, offset = 0, push = 0, pull = 0 } = item.colOptions;
        let s = span + offset + push - pull;
        sum += s;
        if (sum > 24) {
          items.push(row);
          sum = s;
          row = [item];
        } else {
          row.push(item);
        }
      });
      items.push(row);
      return items;
    }
  },
  watch: {}
};
</script>

<style scoped>
.uneditable-form >>> .el-form-item {
  margin-bottom: 0;
}
.el-icon-warning {
  color: #faad14;
  position: absolute;
  left: -30px;
  top: 0;
  cursor: pointer;
}
</style>
