<template>
  <common-select
    ref="select"
    v-model="svalue"
    type="code"
    v-bind="$attrs"
    :config="code"
    :load-data="loadData"
    @change="change"
  ></common-select>
</template>

<script>
import CommonSelect from './CommonSelect';
import queryutil from '../../service/common.js';

export default {
  name: 'codeSelect',
  components: { CommonSelect },
  props: {
    code: {
      type: Object,
      default() {
        return {};
      }
    },
    value: {
      type: [String, Array, Number],
      default() {
        return [];
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      svalue: this.value
    };
  },
  created() {},
  mounted() {},
  methods: {
    loadData() {
      let params = {
        codeDefId: this.code.code,
        dataFilter: this.code.dataFilter,
        columns: this.code.columns,
        params: this.code.codeparams
      };
      return new Promise((resolve, reject) => {
        queryutil
          .getCodeList(params)
          .then(response => {
            if (response.data.status === 'success') {
              let obj = JSON.parse(response.data.data);
              if (obj.datas) {
                obj = obj.datas[0].columnValue.map(item => {
                  //组装下拉框内容
                  return {
                    value: item[0],
                    label: item[1],
                    orgData: item
                  };
                });
                if (typeof this.code.handler === 'function') {
                  obj = this.code.handler(obj);
                }
                resolve(obj);
              } else {
                reject('码表数据加载失败');
              }
            } else {
              reject('码表数据加载失败');
            }
          })
          .catch(res => {
            reject(res);
          });
      });
    },
    change(val, orgData) {
      this.$emit('change', val, orgData);
    }
  },
  computed: {},
  watch: {
    value(nv) {
      this.svalue = this.value;
    }
  }
};
</script>
<style scoped></style>
