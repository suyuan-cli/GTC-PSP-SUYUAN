<template>
  <el-select
    :class="['common-select', { 'common-select-self': !orgMultiple }]"
    v-model="svalue"
    filterable
    remote
    :placeholder="placeholder"
    reserve-keyword
    v-load-more="load"
    v-multi-show="orgMultiple"
    @change="change"
    @focus="focus"
    @blur="blur"
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :clearable="clearable"
    :disabled="disabled"
    :readonly="readonly"
    :size="size"
  >
    <el-option v-for="item in dropList" :key="item.value" :label="item.label" :value="item.value">
      <slot name="option" :scope="item">{{ item.label }}</slot>
    </el-option>
  </el-select>
</template>

<script>
import queryutil from '../../service/common';

export default {
  name: 'remoteSelect',
  props: {
    placeholder: {
      type: String,
      default () {
        return '请选择';
      }
    },
    value: {
      type: [String, Array, Number],
      default () {
        return [];
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    collapseTags: {
      type: Boolean,
      default: true
    },
    //原始的多选样式
    orgMultiple: { type: Boolean, default: false },
    // 多选
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    /*code:码表之类的，custom：自定义*/
    useFor: { type: String, default: 'code' },
    /*code、dict*/
    type: { type: String, default: 'code' },
    config: { type: Object },
    getParams: {
      type: Function,
      default (params, config) {
        /*如果配置里有参数处理方法。则调用该方法*/
        if (typeof config.getParams === 'function') {
          return config.getParams(params, config);
        }
        let p = {
          codeDefId: config.code,
          dataFilter: config.dataFilter,
          columns: config.columns,
          params: config.codeparams || {},
          pageNo: params.page,
          rowsPerPage: params.limit
        };
        if (params.filterValue) {
          p.params.SQLFILTER = `${this.nameCol} like '%${params.filterValue}%'`;
        }
        return p;
      }
    },
    /* 返回promise并传回{data,totalPage,nameCol,codeCol,refreshFirstPage}
     *  调用 FRONTCOMMCODE010 码表查询接口时，无需传入该方法
     *  refreshFirstPage:刷新第一页数据
     * */
    loadData: {
      type: Function,
      default (params) {
        return new Promise((resolve, reject) => {
          queryutil.getCodeList(params).then(res => {
            // console.log(res);
            let datas = [];
            let pageSumCount = 0;
            let codeCol = null;
            let nameCol = null;
            if (res.data.data) {
              let data = JSON.parse(res.data.data);
              if (data.datas[0]) {
                codeCol = data.datas[0].columnNames[0];
                nameCol = data.datas[0].columnNames[1];
                datas = data.datas[0].columnValue.map(item => {
                  return {
                    value: item[0],
                    label: item[1],
                    orgData: item
                  };
                });
              }
              pageSumCount = data.pageSumCount;
            }
            resolve({
              data: datas,
              totalPage: pageSumCount,
              codeCol,
              nameCol
            });
          });
        });
      }
    },
    events: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      /*这两个值要在第一次请求数据后设置*/
      codeCol: null,
      nameCol: null,
      firstPageData: null,
      //远程搜索组件
      svalue: null,
      dropList: [],
      loading: false,
      dataFilter: null,
      columns: null,
      page: 1,
      totalPage: 1,
      limit: 20,
      filterValue: '',
      /*0:初始化，1：需要加载已选择数据，2：已加载已选择数据*/
      initFlag: 0,
      selectOptions: []
    };
  },
  created () {
    this.setSvalue();
  },
  mounted () {
    this.useFor === 'code' && this.initData();
    this.clearValidate();
  },
  methods: {
    setSvalue () {
      this.svalue = this.multiple
        ? (this.value || '').split(',').filter(item => item !== '')
        : this.value;
      this.setNowList();
    },
    getValue () {
      if (this.multiple) {
        return this.svalue.length === 0 ? null : this.svalue.join(',');
      } else {
        return this.svalue === '' ? null : this.svalue;
      }
    },
    load () {
      /*最后一页*/
      if (this.page >= this.totalPage) return;
      this.page++;
      this.remoteMethod(this.filterValue, this.page);
    },
    change (val) {
      let v = this.getValue();
      let org = this.dropList.find(item => item.value === this.svalue);
      this.selectOptions = [org];
      this.$emit('change', v, org);
      if (this.events && typeof this.events.change === 'function') {
        this.events.change(v, org);
      }
    },
    initData () {
      // this.loading = true;
      this.loadData(
        this.getParams(
          {
            filterValue: this.filterValue,
            page: this.page,
            limit: this.limit
          },
          this.config
        )
      )
        .then(data => {
          this.totalPage = data.totalPage;
          this.nameCol || (this.nameCol = data.nameCol);
          this.codeCol || (this.codeCol = data.codeCol);
          if (this.initFlag === 1) {
            this.loadSelectOptions();
            this.initFlag = 2;
          }
          if (this.page !== 1) {
            this.setNowList(this.dropList.concat(data.data));
          } else {
            this.setNowList(data.data);
          }
          if (data.refreshFirstPage) {
            this.firstPageData = data.data;
          }
          !this.firstPageData && (this.firstPageData = data.data);
        })
        .catch(msg => {
          console.error(msg);
        });
    },
    loadSelectOptions () {
      let p = this.getParams(
        {
          filterValue: this.filterValue,
          page: this.page,
          limit: this.limit
        },
        this.config
      );
      let flag = true;
      if (this.multiple && this.svalue.length > 0) {
        p.params.SQLFILTER = `${this.codeCol} in ('${this.svalue.join(
          "','"
        )}')`;
      } else if (this.svalue) {
        p.params.SQLFILTER = `${this.codeCol} = '${this.svalue}'`;
      } else {
        flag = false;
      }
      flag && this.loadData(p)
        .then(data => {
          this.selectOptions = data.data;
          this.setNowList(this.selectOptions.concat(this.firstPageData));
        })
        .catch(msg => {
          console.error(msg);
        });
    },
    setNowList (data = this.firstPageData) {
      data = this.getDistinctData(data);
      let val = this.svalue || '';
      if (!Number.isNaN(val)) {
        val += '';
      }
      if (data) {
        this.dropList = data;
      }
    },
    getDistinctData (data) {
      data = data || [];
      return this.selectOptions.concat(
        data.filter(item => {
          return (
            this.selectOptions.findIndex(el => {
              return el.value === item.value;
            }) === -1
          );
        })
      );
    },
    remoteMethod (query, page = 1) {
      this.filterValue = query;
      this.page = page;
      this.initData();
    },
    focus () {
      this.page = 1;
      this.setNowList();
    },
    blur () {
      this.filterValue = '';
    },
    clearValidate () {
      let parent = this.$parent;
      while (parent) {
        if (typeof parent.clearValidate === 'function') {
          this.$nextTick(() => {
            parent.clearValidate();
          });
          break;
        } else {
          parent = parent.$parent;
        }
      }
    }
  },
  computed: {},
  watch: {
    value (nv) {
      /*第一页数据已返回*/
      this.setSvalue();
      if (this.useFor === 'code') {
        if (this.codeCol && this.initFlag === 0) {
          this.loadSelectOptions();
          this.initFlag = 2;
        }
        if (this.codeCol === null) {
          this.initFlag = 1;
        }
      }
    }
  }
};
</script>
<style scoped>
.common-select-self >>> .common-select-label {
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(96, 98, 102);
  font-size: 12px;
  padding-left: 15px;
}

.common-select-self >>> .el-tag {
  display: none;
}

.common-select >>> .el-icon-:before {
  content: '\E605';
}

.common-select >>> .is-focus .el-icon- {
  transform: rotateZ(0deg);
}
</style>
