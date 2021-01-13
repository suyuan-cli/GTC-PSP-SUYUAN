let formatError = errObj => {
  let col = errObj.column || errObj.columnNumber; // Safari Firefox
  let row = errObj.line || errObj.lineNumber; // Safari Firefox
  let message = errObj.message;
  let name = errObj.name;

  let { stack } = errObj;
  if (stack) {
    let matchUrl = stack.match(/https?:\/\/[^\n]+/);
    let urlFirstStack = matchUrl ? matchUrl[0] : '';
    let regUrlCheck = /https?:\/\/(\S)*\.js/;

    let resourceUrl = '';
    if (regUrlCheck.test(urlFirstStack)) {
      resourceUrl = urlFirstStack.match(regUrlCheck)[0];
    }

    let stackCol = null;
    let stackRow = null;
    let posStack = urlFirstStack.match(/:(\d+):(\d+)/);
    if (posStack && posStack.length >= 3) {
      [, stackCol, stackRow] = posStack;
    }

    // TODO formatStack
    return {
      content: stack,
      col: Number(col || stackCol),
      row: Number(row || stackRow),
      message,
      name,
      resourceUrl
    };
  }

  return {
    row,
    col,
    message,
    name
  };
};

let errorCatch = {
  init: cb => {
    let _originOnerror = window.onerror;
    window.onerror = (...arg) => {
      let [errorMessage, scriptURI, lineNumber, columnNumber, errorObj] = arg;
      // console.log(arg, 'cuowu');
      let errorInfo = formatError(errorObj); //格式化错误信息，todo，可以通过sourcemap文件，把具体的错代码找到并且记录
      errorInfo._errorMessage = errorMessage;
      errorInfo._scriptURI = scriptURI;
      errorInfo._lineNumber = lineNumber;
      errorInfo._columnNumber = columnNumber;
      errorInfo.type = 'onerror';
      cb(errorInfo);
      _originOnerror && _originOnerror.apply(window, arg);
    };

    let _originOnunhandledrejection = window.onunhandledrejection;
    window.onunhandledrejection = (...arg) => {
      //promise的错误监控
      /*vue的错误捕获*/
      if (arg[1] === 'VUE') {
        cb({
          type: 'unhandledrejection',
          content: arg[0].stack,
          col: null,
          row: null,
          message: arg[0].message,
          name: '',
          resourceUrl: ''
        });
      } else {
        let e = arg[0];
        cb({
          type: e.type || 'unhandledrejection',
          content: e.reason.stack,
          col: null,
          row: null,
          message: e.reason.message,
          name: '',
          resourceUrl: ''
        });
      }

      _originOnunhandledrejection &&
        _originOnunhandledrejection.apply(window, arg);
    };
  }
};

export default errorCatch;

export const errorHandler = (error, vm) => {
  console.error(error);
  window.onunhandledrejection(error, 'VUE', vm);
};
