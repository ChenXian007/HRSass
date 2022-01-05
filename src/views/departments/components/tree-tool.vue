<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <!-- 左边 -->
    <el-col>
      <span>{{ treeData.name }}</span>
    </el-col>
    <!-- 右边 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeData.manager }}</el-col>
        <!-- 下拉 -->
        <el-col>
          <el-dropdown @command="handleCommand">  <!-- 事件冒泡 -->
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'

export default {
  props: {
    treeData: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        this.$emit('addDept', this.treeData)
      } else if (type === 'edit') {
        this.$emit('editDepts', this.treeData)
      } else if (type === 'del') {
        // alert('edit')
        this.$confirm(`确定删除${this.treeData.name}`).then(() => {
          return delDepartments(this.treeData.id)
        }).then(() => {
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }

  }

}
</script>

<style>

</style>
