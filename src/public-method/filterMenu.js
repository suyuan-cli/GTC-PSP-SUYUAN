const filterRouter = function({
  allMenus = [],
  assetMenus = [],
  localEqField = 'name',
  urlEqField = 'moduleCode',
  childField = 'children',
  assignmentFn = function(localItem, urlItem) {},
  compareFn = function(localItem, urlItem, localEqField, urlEqField) {
    return urlItem[urlEqField] == localItem[localEqField];
  }
}) {
  let array = [];
  if (
    !allMenus ||
    allMenus.length == 0 ||
    !assetMenus ||
    assetMenus.length == 0
  ) {
    return array;
  }
  function recursive(
    allMenus,
    assetMenus,
    localEqField,
    urlEqField,
    assignmentFn,
    compareFn
  ) {
    return allMenus.length
      ? allMenus.map(function(o) {
          let isInclude = false;
          for (let i = 0, l = assetMenus.length; i < l; i++) {
            if (compareFn(o, assetMenus[i], localEqField, urlEqField)) {
              assignmentFn(o, assetMenus[i]);
              isInclude = true;
              break;
            }
          }
          if (isInclude) {
            let oNew = Object.assign({}, o);
            if (oNew[childField]) {
              oNew[childField] = recursive(
                o[childField],
                assetMenus,
                localEqField,
                urlEqField,
                assignmentFn
              );
            } else {
              delete oNew[childField];
            }
            return oNew;
          } else {
            return false;
          }
        })
      : [];
  }

  function removeEmpty(parent) {
    if (parent && parent[childField]) {
      let children = parent[childField];
      for (let i = children.length - 1; i >= 0; i--) {
        if (!children[i]) {
          children.splice(i, 1);
        } else if (children[i].children) {
          removeEmpty(children[i]);
        }
      }
    }
    if (parent.children && parent.children.length == 0) {
      delete parent.children;
    }
    return parent;
  }
  let showModuls = recursive(
    allMenus,
    assetMenus,
    localEqField,
    urlEqField,
    assignmentFn,
    compareFn
  );

  showModuls.map(function(item) {
    if (item) {
      let children = removeEmpty(item);
      array.push(children);
    }
  });
  return array;
};

const filterMenu = function(menus, checkList, checkfliedName, menuLevel = 1) {
  let arr = [];
  menus.forEach(element => {
    let fitem = checkList.find(item => {
      if (element.key == item[checkfliedName]) {
        return true;
      }
    });
    if (fitem || menuLevel === 1) {
      arr.push(element);
      if (element.subs) {
        element.subs = filterMenu(
          element.subs,
          checkList,
          checkfliedName,
          menuLevel + 1
        );
        if (element.subs.length === 0) {
          if (menuLevel === 1) {
            element.noPermission = true;
          }
          if (
            Number.parseInt(element.index) == element.index &&
            menuLevel !== 1
          ) {
            arr.pop();
          }
          if (Number.parseInt(element.index) != element.index) {
            element.subs = '';
          }
        }
      }
    }
  });
  return arr;
};

export { filterRouter, filterMenu };
