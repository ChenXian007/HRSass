// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTool from './Pagetool'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import LangSelect from './lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTool', PageTool)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
    Vue.component('LangSelect', LangSelect) // 完成组件的注册
    Vue.component('TagsView', TagsView)
  }
}

