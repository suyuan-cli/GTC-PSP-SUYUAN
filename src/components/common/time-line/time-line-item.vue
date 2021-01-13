<template>
  <div
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="time-line-item"
    :class="{ active: activity, 'is-hover': isHover }"
  >
    <slot name="label">
      <div class="time-line-item-label" :style="labelStyle">
        {{ label }}
      </div>
    </slot>
    <slot name="avatar">
      <div class="time-line-item-avatar">
        <el-avatar :src="src ? src : infoUrl"></el-avatar>
        <div class="time-line-vertical time-line-top"></div>
        <div class="time-line-vertical time-line-bottom"></div>
      </div>
    </slot>
    <div class="time-line-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-line-item',
  components: {},
  props: {
    // labelWidth: {
    //   type: [String],
    //   default: null
    // },
    label: {
      type: String,
      default: ''
    },
    src: {
      type: String
    },
    activity: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {},
  data() {
    return {
      labelWidth: null,
      isHover: false,
      infoUrl: require('../../../assets/img/nologo.png')
    };
  },
  methods: {},
  computed: {
    labelStyle() {
      if (this.labelWidth !== null) {
        return {
          width: this.labelWidth
        };
      } else {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.time-line-item {
  display: flex;
  padding: 15px;
}

/*.time-line-item-label:hover {
  color: #007aff;
}

.time-line-item-avatar >>> .el-avatar {
  border-color: #007aff;
}

.time-line-item-content:hover {
  border-color: #007aff;
}
*/
.active .time-line-item-content:before:hover {
  border-right-color: #007aff;
}
.time-line-item.is-hover .time-line-item-label {
  color: #007aff;
}
.time-line-item.is-hover .time-line-item-content,
.time-line-item.is-hover .time-line-item-avatar {
  border-color: #007aff;
}

.time-line-item.is-hover .time-line-item-content:before {
  border-right-color: #007aff;
}

.time-line-item .time-line-item-label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60px;
}

.time-line-item-avatar >>> .el-avatar {
  border: 1px #eeeeee solid;
}
.time-line-item-avatar >>> .el-avatar > img {
  width: 100%;
}
.time-line-item .time-line-item-avatar {
  display: flex;
  align-items: center;
  padding: 0 20px 0 10px;
  position: relative;
}
.time-line-item-content {
  flex-grow: 1;
  border: 1px solid #eeeeee;
  position: relative;
  box-sizing: border-box;
}
.time-line-item-content:before {
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: #eeeeee;
  position: absolute;
  left: -20px;
  top: calc(50% - 10px);
}

.time-line-item-content:after {
  content: '';
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right-color: #ffffff;
  position: absolute;
  left: -16px;
  top: calc(50% - 8px);
}

.time-line-vertical {
  position: absolute;
  width: 0;
  /*一半的高度-头像高度+padding高度*/
  height: calc(50% - 38px + 32px);
  left: calc(50% - 6px);
  border: 1px solid #eeeeee;
}
.time-line-top {
  top: -15px;
}

.time-line-bottom {
  top: calc(50% + 20px);
}
</style>
