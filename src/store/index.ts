import { createStore } from 'vuex'
import templates, { TemplateProps } from './templates'
import user, { UserProps } from './user'

export interface GlobalDataProps {
  user: UserProps;
  template: TemplateProps;
}

const store = createStore({
  modules:{
    user,
    templates
  }
})

export default store