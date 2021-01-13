import getXpath from './util/xpath.js';

export default {
  init: cb => {
    document.addEventListener(
      'click',
      e => {
        setTimeout(() => {
          let xpath = getXpath(e.target);
          cb({
            xpath,
            classname: e.srcElement.classList.toString(),
            tagname: e.srcElement.tagName,
            innertext: e.srcElement.innerText
          });
        }, 0);
      },
      false
    );
  }
};
