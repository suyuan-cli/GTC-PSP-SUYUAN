<!--
 @search="search" //点击查询事件
:model="formInfo" //条件对象

//demo
 <query-condition :model="formInfo" class="demo-form-inline" @search="search">
        <el-form-item label="商品中文名">
          <el-input v-model="formInfo.number" class="el-input-num"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="el-form-item-time">
          <el-col :span="11">
            <el-date-picker type="date" v-model="formInfo.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-date-picker type="date" v-model="formInfo.date2"></el-date-picker>
          </el-col>
        </el-form-item>

        //高级条件
        <el-row slot="senior">
          <el-form-item label="商品中文名">
            <el-input v-model="formInfo.number1" class="el-input-num"></el-input>
          </el-form-item>
        </el-row>
      </query-condition>
-->

<template>
  <el-form
    :inline="true"
    ref="formInner"
    :model="model"
    class="query-condition"
    size="mini"
    label-width="103px"
    :rules="rules"
  >
    <el-row class="often">
      <el-col :span="17">
        <slot></slot>
      </el-col>
      <el-col :span="7">
        <el-button
          type="primary"
          v-show="showSearchBtn"
          @click="onSubmit"
          class="el-button-cx"
          >查询</el-button
        >
        <el-button
          type="primary"
          v-show="showResetBtn"
          @click="reset"
          class="el-button-cx reset-btn"
          >重置</el-button
        >
        <a
          href="javascript:void(0)"
          class="el-dropdown-link"
          :class="{ isReverse: isReverse }"
          @click="isReverse = !isReverse"
          v-show="hasSeniorChild"
        >
          高级搜索
          <i class="el-icon-caret-bottom el-icon-right"></i>
        </a>
      </el-col>
    </el-row>
    <el-row class="senior-con" :class="{ show: isReverse }">
      <el-col :span="24">
        <slot name="senior"></slot>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default() {
        return {};
      },
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
    showResetBtn: {
      type: Boolean,
      default: true,
    },
    showSearchBtn: {
      type: Boolean,
      default: true,
    },
    searchComponents: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isReverse: false,
      hasSeniorChild: false,
      arrayKeys: [],
    };
  },

  mounted() {
    this.setModelKey();
    if (this.$slots.senior) {
      this.hasSeniorChild =
        this.$slots.senior[0].componentOptions.children.length > 0;
    }
    //todo 实现方法待修改，label：hover显示title

    let labels = document.querySelectorAll(
      '.query-condition .el-form-item__label'
    );
    for (var i = 0, l = labels.length; i < l; i++) {
      let node = labels[i];
      node.setAttribute('title', node.innerHTML);
    }
  },
  methods: {
    reset() {
      this.$refs.formInner.resetFields();
      this.$emit('reset');
    },
    onSubmit() {
      // let m = { ...this.model };
      // this.arrayKeys.forEach(item => {
      //   m[item] = m[item] ? m[item].split(',') : [];
      // });
      this.$emit('search', this.model);
    },
    setModelKey() {
      this.$slots.default.forEach((node) => {
        // this.putArrayKey(node.componentInstance);
        if (
          node.componentInstance.prop &&
          !this.model.hasOwnProperty(node.componentInstance.prop)
        ) {
          this.$set(this.model, node.componentInstance.prop, null);
        }
      });
      if (this.$slots.senior) {
        this.$slots.senior[0].componentInstance.$children.forEach((node) => {
          // this.putArrayKey(node);
          if (node.prop && !this.model.hasOwnProperty(node.prop)) {
            this.$set(this.model, node.prop, null);
          }
        });
      }
    },
    putArrayKey(node) {
      let { multiple } = node.$children[1].$attrs;
      if (multiple === '' || multiple) {
        if (!this.arrayKeys.includes(node.prop)) {
          this.arrayKeys.push(node.prop);
        }
      }
    },
  },
};
</script>

<style scoped>
.query-condition >>> .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.often {
  height: 100%;
}
.senior-con.show {
  display: block;
}
.senior-con {
  display: none;
}
.el-dropdown-link,
.el-dropdown-link:hover,
.el-dropdown-link:active {
  color: #606266;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
}
.el-icon-right {
  transition: all 0.3s;
}
.isReverse .el-icon-right {
  transform: rotate(-180deg);
}

.el-button-cx {
  width: 88px;
  height: 28px;
  background: rgba(0, 122, 255, 1);
  border-radius: 2px;
  padding: 7px 15px;
}
.floatRight {
  float: right;
  margin-right: 20px !important;
}
.query-condition {
  position: relative;
}
.reset-btn {
  background: rgb(232, 232, 232);
  color: rgb(0, 0, 0);
  border-color: rgb(232, 232, 232);
}
</style>
