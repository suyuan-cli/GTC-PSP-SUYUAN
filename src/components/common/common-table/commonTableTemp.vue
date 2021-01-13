<template>
  <div class="common-list-page">
    <page-header :paths="paths" v-if="showPageHeader"></page-header>
    <slot name="conditions">
      <query-condition
        ref="queryCondition"
        class="common-list-page-condition"
        :model="model"
        @search="loadData()"
      >
        <template v-for="(item, index) in primaryForm">
          <el-form-item :label="item.label" :key="index" :prop="item.prop">
            <component
              v-bind:is="item.component.name"
              v-bind="item.component.options"
              v-model="model[item.prop]"
            ></component>
          </el-form-item>
        </template>
        <el-row slot="senior">
          <template v-for="(item, $index) in seniorForm">
            <el-form-item :label="item.label" :key="$index" :prop="item.prop">
              <component
                v-bind:is="item.component.name"
                v-bind="item.component.options"
                v-model="model[item.prop]"
              ></component>
            </el-form-item>
          </template>
        </el-row>
      </query-condition>
    </slot>
    <div class="common-list-page-table">
      <slot name="regula"></slot>
      <slot name="toolBar" :slot-scope="toolBarScope"></slot>
      <common-table
        :data="table.data"
        :columns="table.columns"
        :pagination="table.pagination"
        :show-index="showIndex"
        :show-operation="showOperation"
        :show-selection="showSelection"
        :operation-btn-getter="operationBtnGetter"
        :operation-type="operationType"
        :events="tableEvent"
        :options="tableOptions"
        v-on="$listeners"
        @load-data="loadData"
      ></common-table>
      <slot name="complain"></slot>
    </div>
  </div>
</template>

<script>
import queryCondition from '../../common/QueryCondition';
import pageHeader from '../../common/PageHeader';
import datePicker from '../../common/DatePicker';
import codeSelect from '../../common/CodeDropDown';
import dictSelect from '../../common/DictionaryDropDown';
import commonTable from '../../common/common-table/index';
import bus from '../bus.js';

const orderMap = {
  ascending: 'ASC',
  descending: 'DESC',
};

export default {
  name: 'commonTableTemp',
  components: {
    queryCondition,
    pageHeader,
    datePicker,
    codeSelect,
    dictSelect,
    commonTable,
  },
  props: {
    /* model: {
      type: Object,
      default() {
        return {};
      }
    },*/
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    paths: {
      type: Array,
      default() {
        return [];
      },
    },
    /*返回一个promise对象，并resolve({data:[]列表数据,total:xxx总行数})*/
    loadDataFn: {
      type: Function,
      default(params) {},
    },
    /*{label:xxx,prop:xxx,type:xxx,component:{name:xxx,options:{...}}}*/
    primaryFormItems: {
      type: Array,
      default() {
        return [];
      },
    },
    /*{label:xxx,prop:xxx,type:xxx}*/
    seniorFormItems: {
      type: Array,
      default() {
        return [];
      },
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    showSelection: {
      type: Boolean,
      default: false,
    },
    operationType: {
      type: String,
      default: 'dropDown',
    },
    showOperation: {
      type: Boolean,
      default: false,
    },
    showPageHeader: {
      type: Boolean,
      default: true,
    },
    operationBtnGetter: {
      type: Function,
      default(scope) {
        return [];
      },
    },
    tableEvent: {
      type: Object,
      default() {
        return {};
      },
    },
    tableOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    /*用于区分当前页面*/
    name: {
      type: String,
      default: 'common',
    },
    toDetailFn: {
      type: Function,
      default(row) {},
    },
  },
  created() {
    this.init();
  },
  mounted() {
    bus.$on(`${this.name}.refresh`, () => {
      this.loadData();
    });
    this.bindMethods('table');
    this.loadData();
  },
  data() {
    return {
      model: {},
      selectedRow: null,
      checkedRow: null,
      table: {
        data: [],
        columns: this.columns,
        pagination: {
          total: 0,
          pageSize: 10,
          currentPage: 1,
        },
        orderParam: {
          orders: [],
        },
      },
      defaultComponents: {
        input: {
          name: 'el-input',
          options: { clearable: true },
        },
        date: {
          name: datePicker,
          options: { clearable: true },
        },
      },
    };
  },
  methods: {
    init() {
      if (!this.tableOptions.hasOwnProperty('border')) {
        // this.tableOptions.border = true;
      }

      let rowClick = this.tableEvent['row-click'];
      this.tableEvent['row-click'] = (row, column, event) => {
        this.selectedRow = row;
        rowClick && rowClick(row, column, event);
      };
      let rowDblclick = this.tableEvent['row-dblclick'];
      this.tableEvent['row-dblclick'] = (row, column, event) => {
        this.toDetailFn(row);
        rowDblclick && rowDblclick(row, column, event);
      };
      let select = this.tableEvent['select'];
      this.tableEvent['select'] = (selection, row) => {
        this.checkedRow = selection;
        select && select(selection, row);
      };
      let selectAll = this.tableEvent['select-all'];
      this.tableEvent['select-all'] = (selection) => {
        this.checkedRow = selection;
        selectAll && selectAll(selection);
      };
      // let sortChange = this.tableEvent['sort-change'];
      this.tableEvent['sort-change'] = ({ column, prop, order }) => {
        this.table.orderParam.orders =
          order === null
            ? []
            : [
                {
                  column: prop,
                  direction: orderMap[order],
                },
              ];
        this.loadData();
      };
    },
    /*外部调用*/
    loadData(pageSize, currentPage = 1) {
      this.table.pagination.currentPage = currentPage;
      this.selectedRow = null;
      this.checkedRow = null;
      let p = {
        ...this.model,
        pageParam: {
          pageNo: this.table.pagination.currentPage,
          rowsPerPage: this.table.pagination.pageSize,
        },
        orderParam: this.table.orderParam,
      };
      if (p.orderParam.orders === null || p.orderParam.orders.length === 0) {
        delete p.orderParam;
      }
      this.loadDataFn(p).then((data) => {
        this.table.data = data.data;
        this.table.pagination.total = data.total;
      });
    },
    getFormItems(items) {
      return items.map((item) => {
        if (
          item.hasOwnProperty('type') &&
          this.defaultComponents.hasOwnProperty(item.type)
        ) {
          item.component = this.defaultComponents[item.type];
        }
        this.$set(this.model, item.prop, null);
        // this.model[item.prop] = item.defaultValue || null;
        return item;
      });
    },
    getSelectedData() {
      return this.toolBarScope;
    },
    resetQueryCondition() {
      this.$refs.queryCondition.reset();
    },
  },
  computed: {
    primaryForm() {
      return this.getFormItems(this.primaryFormItems);
    },
    seniorForm() {
      return this.getFormItems(this.seniorFormItems);
    },
    toolBarScope() {
      return {
        selectedRow: this.selectedRow,
        checkedRow: this.checkedRow,
      };
    },
  },
};
</script>

<style scoped>
.common-list-page-condition >>> .el-input__inner {
  width: 300px;
}

.common-list-page {
  background-color: #ffffff;
}

.common-list-page-condition {
  margin-top: 20px;
}

.common-list-page-table {
  border-top: 10px solid #f5f5f5;
  padding: 20px 18px;
}
</style>
