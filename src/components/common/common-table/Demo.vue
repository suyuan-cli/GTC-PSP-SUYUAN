<template>
  <common-table
    :options="options"
    :columns="columns"
    :data="data"
    :events="events"
    :total="100"
    show-selection
    show-operation
    operation-type="list"
    operation-width="180"
    @load-data="loadData"
    :operationBtnGetter="operationBtnGetter"
  ></common-table>
</template>

<script>
import commonTable from './index';
export default {
  name: 'common-table-demo',
  components: { commonTable },
  props: {},
  created() {},
  mounted() {},
  data() {
    return {
      options: {},
      data: [{ time: '2020-5-11', address: 'kkk' }, { time: '2020-5-11' }],
      columns: [
        { label: '时间', prop: 'time', width: '400px', sortable: 'custom' },
        {
          label: '地点',
          prop: 'address',
          width: '400px',
          formatter(row, column, cellValue, index) {
            // console.log(row, column, cellValue, index);
            return '<span style="color:red;">666</span>';
          }
        },
        { label: '人物', prop: 'person', width: '400px' },
        {
          label: '事件',
          prop: 'event',
          align: 'center',
          children2: [
            { label: '起因', prop: 'reason' },
            {
              label: '结果',
              prop: 'result',
              formatter(row, column, cellValue, index) {
                // console.log(row, column, cellValue, index);
                return '<div style="color:red;">666</div>';
              }
            }
          ]
        }
      ],
      events: {
        'sort-change': this.sortChange
      }
    };
  },
  methods: {
    loadData(size, page) {
      console.log(page, size);
    },
    operationBtnGetter() {
      return [
        { label: '123', handler() {} },
        { label: '321', handler() {} }
      ];
    },
    sortChange({ column, prop, order }) {
      console.log({ column, prop, order });
    }
  },
  computed: {}
};
</script>

<style scoped></style>
