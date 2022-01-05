export const imagerror = {
  // 先把数据替换到dom上面，再执行自定义指令，最后虚拟dom转真实dom。
  inserted(el, op) {
    el.src = el.src || op.value
    el.onerror = function() {
      el.src = op.value
    }
  },
  // componentUpdated可以拿到组件更新后的数据
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
