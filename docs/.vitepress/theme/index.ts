import DefaultTheme from "vitepress/theme";
import { App } from "vue";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

import ElementPlus from "element-plus";
// TODO 从npm引入
import PpComponents from "../../../dist/pp-components";
import "../../../dist/style.css";

export default {
  ...DefaultTheme,
  // 全局注册组件
  enhanceApp: ({ app }: { app: App }) => {
    app.use(ElementPlus);
    app.use(PpComponents);
  },
};
