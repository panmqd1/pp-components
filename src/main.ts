import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from "element-plus";

import 'uno.css'
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./style/index.scss";
import './style.css'

const app = createApp(App);

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon,
} from "./packages/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

app.use(ElementPlus).mount("#app");