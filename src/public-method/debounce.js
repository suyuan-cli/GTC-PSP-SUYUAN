// 防抖函数:防止重复点击触发事件
export function debounce(fn, delay = 300) {
  let timeout = null;
  return function() {
    let args = arguments;
    if (timeout) window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流函数:指定时间间隔内只会执行一次任务
export function throttle(fn, delay = 300) {
  let timeout = null;
  return function() {
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(this, args);
      }, delay);
    }
  };
}
