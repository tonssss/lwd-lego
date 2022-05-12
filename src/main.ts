import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import LegoBricks from 'lego-bricks'
import router from './routes/index'
import store from './store/index'
import 'ant-design-vue/dist/antd.css'
import 'lego-bricks/dist/bundle.css'
import 'cropperjs/dist/cropper.css'
const app = createApp(App)
app.use(Antd).use(LegoBricks).use(router).use(store)
app.mount('#app')

