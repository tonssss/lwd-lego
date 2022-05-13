import { createApp } from 'vue'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import App from './App.vue'
import Antd from 'ant-design-vue'
import LegoBricks from 'lego-bricks'
import router from './routes/index'
import store from './store/index'
import 'ant-design-vue/dist/antd.css'
import 'lego-bricks/dist/bundle.css'
import 'cropperjs/dist/cropper.css'
import { RespData } from './store/respTypes'
export type ICustomAxiosConfig = AxiosRequestConfig & {
  opName?: string;
}

const app = createApp(App)
const baseBackendURL = 'http://182.92.168.192:8081'
axios.defaults.baseURL = `${baseBackendURL}/api/`
axios.interceptors.request.use(config => {
  const newConfig = config as ICustomAxiosConfig
  store.commit('setError', { status: false, message: ''})
  store.commit('startLoading', { opName: newConfig.opName })
  return config
})
axios.interceptors.response.use((resp: AxiosResponse<RespData>) => {
  const { config, data } = resp
  const newConfig = config as ICustomAxiosConfig
  store.commit('finishLoading', { opName: newConfig.opName })
  const { errno, message } = data
  if (errno !== 0) {
    store.commit('setError', { status: true, message })
    return Promise.reject(data)
  }
  return resp
}, (e: AxiosError) => {
  const newConfig = e.config as ICustomAxiosConfig
  store.commit('setError', { status: true, message: '服务器错误' })
  store.commit('finishLoading', { opName: newConfig.opName })
  return Promise.reject(e)
})
app.use(Antd).use(LegoBricks).use(router).use(store)
app.mount('#app')

