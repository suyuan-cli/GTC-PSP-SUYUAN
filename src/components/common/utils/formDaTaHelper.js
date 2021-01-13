/*该类用于处理表单列表数据的状态
 * 首先记录原始的表单列表数据，然后将修改后的表单列表数据传入
 * 处理状态（saveMode）后返回一个表单数据
 * */
/*默认状态映射*/
const defModeMap = {
  add: 2,
  delete: 4,
  edit: 1
};
export default class FormDataHelper {
  constructor(formData = null, options = {}) {
    this.setFormData(formData);
    this.setOptions(options);
  }
  setOptions(options) {
    let {
      /*状态字段*/
      modeKey = 'saveMode',
      /*状态映射关系*/
      modeMap = defModeMap,
      /*是否过滤掉修改状态的数据*/
      filterEdit = false,
      /*内码字段*/
      icodeKey,
      /*是否返回完整的被删除数据信息，
       * false：仅返回内码和状态字段 {icode,saveMode}
       * */
      completeRemoveData = false
    } = options;
    this.modeKey = modeKey;
    this.modeMap = modeMap;
    this.filterEdit = filterEdit;
    this.icodeKey = icodeKey;
    this.completeRemoveData = completeRemoveData;
  }
  setFormData(formData) {
    if (formData) this.formData = window.app.deepCopy(formData);
  }

  getSettedFormData() {
    return this.formData;
  }
  /*对比数组数据*/
  getFormData(newFormData, targetKey = null, icodeKey = this.icodeKey) {
    if (!newFormData) return newFormData;
    newFormData = window.app.deepCopy(newFormData);
    let targetFormData = this.formData;
    if (targetKey) {
      if (Array.isArray(targetKey)) {
        targetKey.forEach(k => {
          targetFormData = targetFormData[k];
        });
      } else {
        targetFormData = targetFormData[targetKey];
      }
    }
    targetFormData = targetFormData || [];
    newFormData.forEach(item => {
      let icode = item[icodeKey];
      item.saveMode = icode ? this.modeMap.edit : this.modeMap.add;
    });
    let removed = targetFormData
      .filter(item => {
        return !newFormData.some(el => el[icodeKey] === item[icodeKey]);
      })
      .map(item => {
        item.saveMode = this.modeMap.delete;
        return item;
      });
    if (!this.completeRemoveData) {
      removed = removed.map(item => {
        let icode = item[icodeKey];
        let saveMode = item.saveMode;
        return {
          [icodeKey]: icode,
          saveMode
        };
      });
    }
    newFormData = newFormData.concat(removed);
    return newFormData;
  }
}
