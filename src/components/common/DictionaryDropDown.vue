<template>
  <common-select
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
  name: 'dictSelect',
  components: { CommonSelect },
  props: {
    code: {
      type: Object,
      default() {
        return {};
      }
    },
    codeid: {
      type: String,
      default: null
    },
    value: {
      type: [String, Array, Number],
      default() {
        return null;
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
        dictDefId: this.code.code,
        dataFilter: this.code.dataFilter,
        sqlFilter: this.code.sqlFilter,
        params: this.code.codeparams
      };
      return new Promise((resolve, reject) => {
        queryutil
          .getDictionaryList(params)
          .then(response => {
            if (response.data.status === 'success') {
              let obj = JSON.parse(response.data.data);
              if (Array.isArray(obj.datas) && obj.datas.length > 0) {
                obj = obj.datas.map(item => {
                  //组装下拉框内容
                  return {
                    value: item.code,
                    label: item.name,
                    orgData: item
                  };
                });
                if (typeof this.code.handler === 'function') {
                  obj = this.code.handler(obj);
                }
                resolve(obj);
              } else {
                reject('字典数据加载失败');
              }
            } else {
              reject('字典数据加载失败');
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
      this.svalue = nv;
    }
  }
};
</script>
<style scoped></style>
