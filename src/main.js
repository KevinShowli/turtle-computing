import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import {
  Button,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Table,
  TableColumn,
  Dialog,
  InputNumber,
  Input,
  Switch,
  Radio,
  RadioGroup,
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(Table)
Vue.use(Dialog)
Vue.use(InputNumber)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Switch)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
