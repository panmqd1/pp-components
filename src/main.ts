import { createApp } from 'vue'
import App from './App.vue'

import "./style/index.scss";
import './style.css'

window._AMapSecurityConfig = {
  securityJsCode:"8b04f37501a2a3e5f110ee5a570562f7",
}

createApp(App).mount('#app')
