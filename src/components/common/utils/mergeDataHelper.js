const statusMap = {
  INIT: 'init',
  PENDING: 'pending',
  DONE: 'done'
};
export default class MergeDataHelper {
  constructor(options = {}) {
    this.setOptions(options);
    this.reset();
  }

  setOptions(options) {
    let {
      /*步骤名称列表*/
      stepNames = [],
      /*一次任务完成后，自动重置任务状态*/
      autoReset = false,
      /* 完成状态的回调函数
       * 入参：{stepName(步骤名):data(该步骤对应的数据)}
       * */
      doneHandler
    } = options;
    this.stepNames = stepNames;
    this.autoReset = autoReset;
    this.doneHandler = doneHandler;
  }

  reset() {
    this.status = statusMap.INIT;
    this.stepDataObj = {};
  }

  push(stepName, stepData = null) {
    /*传入的步骤名称在预设的步骤名称列表中
     * 且没设置过值
     * */
    if (
      this.stepNames.includes(stepName) &&
      !this.stepDataObj.hasOwnProperty(stepName)
    ) {
      this.stepDataObj[stepName] = stepData;
      this.emit();
    }
  }

  emit() {
    if (Object.keys(this.stepDataObj).length === this.stepNames.length) {
      this.status = statusMap.DONE;
      this.doneHandler(this.stepDataObj);
      this.autoReset && this.reset();
    } else {
      this.status = statusMap.PENDING;
    }
  }
}
