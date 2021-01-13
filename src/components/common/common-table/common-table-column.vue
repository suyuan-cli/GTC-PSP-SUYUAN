<template>
  <el-table-column v-bind="$props">
    <template v-for="(item, index) in children">
      <common-table-column :key="index" v-bind="item"></common-table-column>
    </template>
    <template slot-scope="scope">
      <template v-if="isHtmlContent(scope)">
        <div class="text-wrap" v-html="contentData[scope.$index]"></div>
      </template>
      <template v-else>
        {{ contentData[scope.$index] }}
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { TableColumn } from 'element-ui';
const pattern = /<[^>]+>/g;
export default {
  name: 'common-table-column',
  components: {},
  props: {
    ...TableColumn.props,
    formatter: {
      type: Function,
      default(row, column, cellValue, index) {
        return cellValue;
      }
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'center'
    },
    children: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isHtml: false,
      contentData: {}
    };
  },
  methods: {
    isHtmlContent(scope) {
      let { row, column, $index } = scope;
      let str = this.formatter(row, column, row[scope.column.property], $index);
      this.contentData[$index] = str;
      return (str + '').match(pattern) !== null;
    }
  },
  computed: {}
};
</script>
<style scoped>
.text-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
