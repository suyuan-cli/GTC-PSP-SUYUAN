<template>
  <div>
    <div class="el-dropdown-link" @click="visible = true">
      选择商品登记
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dialog :visible.sync="visible" width="50%" @opened="opened">
      <span slot="title">商品选择</span>
      <el-form :model="model" inline>
        <el-form-item label="商品名称">
          <el-input v-model="model.cargoname"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <date-picker v-model="model.predate"></date-picker>
        </el-form-item>
        <el-button type="primary" style="float: right" @click="query()"
          >查询</el-button
        >
      </el-form>
      <common-table
        v-loading="loading"
        :options="options"
        :columns="columns"
        :events="events"
        :data="data"
        @load-data="loadData"
        :pagination="pagination"
      ></common-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()" class="dialog-footer-btn"
          >确认</el-button
        >
        <el-button
          type="info"
          @click="visible = false"
          class="dialog-footer-btn"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonTable from './common-table/index';
import datePicker from './DatePicker';
import { getCargoInfoList } from '../../service/impartial';
export default {
  components: {
    commonTable,
    datePicker
  },
  props: {},
  mounted() {},
  data() {
    return {
      init: false,
      visible: false,
      loading: false,
      isShow: this.visible,
      nowRow: null,
      model: {
        cargoname: null,
        predate: ['', '']
      },
      options: {
        maxHeight: 450
      },
      events: {
        'row-click': this.rowClick,
        'row-dblclick': this.dblclick
      },
      columns: [
        { label: '商品名称', prop: 'cargoname', minWidth: '200px' },
        { label: '品牌', prop: 'brandname', width: '120px' },
        { label: '规格', prop: 'spec', width: '100px' },
        { label: '型号', prop: 'model', width: '100px' },
        { label: '原产国/地区', prop: 'assemcountry', width: '120px' },
        {
          label: '创建时间',
          align: 'center',
          prop: 'predate',
          width: '120px',
          formatter: this.dateFormat
        }
      ],
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      data: []
    };
  },
  methods: {
    rowClick(row, column, event) {
      this.nowRow = row;
    },
    dblclick(row, column, event) {
      this.nowRow = row;
      this.submit();
    },
    submit() {
      this.visible = false;
      this.$emit('submit', { ...this.nowRow });
    },
    loadData(pageSize, currentPage) {
      this.pagination.pageSize = pageSize;
      this.query(currentPage);
    },
    opened() {
      /*只有首次进来才默认查询*/
      !this.init && this.query();
    },
    //查询商品
    query(currentPage = 1) {
      this.pagination.currentPage = currentPage;
      this.loading = true;
      getCargoInfoList(this.getParams())
        .then(data => {
          this.init = true;
          this.data = data.data.datas;
          this.pagination.total = data.data.totalRows;
          console.log(data.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getParams() {
      let p = {};
      p.cargoname = this.model.cargoname;
      if (this.model.predate !== null) {
        p.predatefrom = this.model.predate[0];
        p.predateto = this.model.predate[1];
      }
      p.pageParam = {
        pageNo: this.pagination.currentPage,
        rowsPerPage: this.pagination.pageSize
      };
      return p;
    },
    dateFormat(row, column, cellValue, index) {
      return this.formatDate(cellValue, 'YYYY-MM-DD');
    }
  },
  computed: {}
};
</script>

<style scoped>
.el-dropdown-link {
  width: fit-content;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 122, 255, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 122, 255, 1);
  padding: 5px;
}
</style>
