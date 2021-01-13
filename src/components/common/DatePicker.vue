<!-- 日期选择框公共组件  -->
<!-- 父组件使用方法 -->
<!--  <date-picker v-model="['2020-05-01 00:00:00', '2020-05-31 00:00:00']"></date-picker>

      } -->

<template>
  <el-date-picker
    v-model="vdate"
    type="daterange"
    align="right"
    unlink-panels
    :clearable="clearable"
    value-format="yyyy-MM-dd HH:mm:ss"
    range-separator="~"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    @change="dateChange"
  ></el-date-picker>
</template>
<script>
export default {
  name: 'DatePicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    clearable: {
      type: Boolean,
      default: true
    },
    /*['2020-05-01 00:00:00', '2020-05-31 00:00:00']*/
    value: Array,
    default() {
      return {};
    },
    useForQuery: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      vdate: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      isEmitChange: false
    };
  },
  methods: {
    dateChange(val) {
      if (this.vdate === null) {
        this.vdate = [];
      }
      this.isEmitChange = true;
      if (this.useForQuery && this.vdate.length > 0) {
        let end = new Date(this.vdate[1]);
        end.setDate(end.getDate() + 1);
        this.$emit('change', [this.vdate[0], this.formatDate(end.getTime())]);
      } else {
        this.$emit('change', this.vdate);
      }
    }
  },
  watch: {
    value: {
      handler(nv) {
        if (!this.isEmitChange) {
          this.vdate = nv;
        }
        this.isEmitChange = false;
      },
      immediate: true
    }
  }
};
</script>
