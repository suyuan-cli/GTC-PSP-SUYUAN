import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
import en from './en.js';
import zh from './zh.js';
const messages = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
};
const i18n = new VueI18n({
  locale: window.localStorage.lang || 'zh', // set locale
  messages // set locale messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
