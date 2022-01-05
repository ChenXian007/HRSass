<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 第一行 -->
        <tree-tool :tree-data="company" :is-root="true" @addDept="addDeptFn" />

        <!-- 树形控件 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tool slot-scope="{data}" :tree-data="data" @delDepts="getDepartments" @addDept="addDeptFn" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :visible.sync="isShow" :tree-data="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import treeTool from './components/tree-tool.vue'
import addDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { arrToTree } from '@/utils/index'
export default {
  components: {
    treeTool,
    addDept

  },
  data() {
    return {
      company: { name: '', manager: '', id: '' },
      departs: [],
      defaultProps: {
        label: 'name'

      },
      isShow: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      console.log(result.depts)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = arrToTree(result.depts, '')
      console.log(this.departs)
    },
    addDeptFn(node) {
      this.isShow = true
      this.node = node
    },
    editDepts(node) {
      this.isShow = true
      this.node = node
      // prop传值也是异步
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card{
   padding: 30px  140px;
  font-size:14px;
}
</style>
