import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";

import "uno.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./style/index.scss";
import "./style.css";

const app = createApp(App);

import install from "./packages";
install(app);

app.use(ElementPlus).mount("#app");
