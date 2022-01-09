<template>
  <el-dialog title="分配角色" :visible="showRoleDiglog" @close="btnCancle">
    <el-checkbox-group v-model="userRole">
      <el-checkbox v-for="role in roleIds" :key="role.id" :label="role.id">
        {{ role.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" @click="btnOk">确定</el-button>
          <el-button @click="btnCancle">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDiglog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      userRole: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.roleIds = rows
    },
    async getUserDetailById(id) {
    // props更新是异步的
      const { roleIds } = await getUserDetailById(id)
      this.userRole = roleIds
    },
    async btnOk() {
      await assignRoles({ id: this.userId, roleIds: this.userRole })
      this.$message.success('操作成功')
      this.$emit('update:showRoleDiglog', false)
    },
    btnCancle() {
      this.userRole = []
      this.$emit('update:showRoleDiglog', false)
    }

  }
}
</script>

<style>

</style>
