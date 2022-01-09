<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tool>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </page-tool>
      <!-- 权限表格 -->
      <el-table
        :data="list"
        row-key="id"
        border
      >
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type === 1" @click="addPermission(2,row.id)">添加</el-button>
            <el-button @click="editPermission(row.id)">编辑</el-button>
            <el-button @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹层表单 -->
      <el-dialog :visible="showDialog" title="新增" @close="btnCancle">
        <el-form ref="perForm" label-width="120px" :model="formData" :rules="rules">
          <el-form-item label="名称" style="width:90%" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="标识" style="width:90%" prop="code">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="描述" style="width:90%">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="开启" style="width:90%">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-row type="flex" justify="center" align="center">
            <el-col :span="6">
              <el-button @click="btnOk">确定</el-button>
              <el-button @click="btnCancle">取消</el-button>
            </el-col>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, delPermission, getPermissionDetail } from '@/api/permisson'
import { arrToTree } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '',
        type: '',
        code: '',
        description: '',
        pid: '',
        enVisible: ''
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = arrToTree(await getPermissionList(), '0')
    },
    // 删除权限
    async del(id) {
      try {
        await this.$confirm('确定删除该权限吗？')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 判断点击哪个添加
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    // 添加
    btnOk() {
      this.$refs.perForm.validate().then(() => {
        if (this.formData.id) {
          return updatePermission(this.formData)
        }
        return addPermission(this.formData)
      }).then(() => {
        this.$message.success('操作成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    // 取消
    btnCancle() {
      this.formData = {
        name: '',
        type: '',
        code: '',
        description: '',
        pid: '',
        enVisible: ''
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },
    // 点击编辑
    async editPermission(id) {
      // 根据获取id获取详情
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
