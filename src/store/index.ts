import axios, { AxiosRequestConfig } from 'axios'
import { compile } from 'path-to-regexp'
import { createStore, ActionContext } from 'vuex'
import templates, { TemplatesProps } from './templates'
import user, { UserProps } from './user'
import editor, { EditorProps } from './editor'
import global, { GlobalStatus } from './global'
export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
  global: GlobalStatus;
}
export interface ActionPayload {
  urlParams?: { [key: string]: any };
  data?: any;
}
//第二步，确定参数
export function actionWrapper(url: string, commitName: string, config: AxiosRequestConfig = { method: 'get'}) {
  // 第一步 不管三七二十一，先返回一个函数和原来的函数处理一摸一样
  return async (context: ActionContext<any, any>, payload: ActionPayload = {}) => {
    //第三部 写内部重复的逻辑
    const { urlParams, data } = payload
    const newConfig = { ...config, data, opName: commitName }
    let newURL = url
    if (urlParams) {
      const toPath = compile(url, { encode: encodeURIComponent })
      newURL = toPath(urlParams)
      console.log(newURL)
    }
    const resp = await axios(newURL, newConfig)
    context.commit(commitName, resp.data)
    return resp.data
  }
}
const store = createStore({
  modules: {
    user,
    templates,
    editor,
    global
  }
})

export default store
