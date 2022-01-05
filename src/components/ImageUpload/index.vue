<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="removeImg"
      :on-change="change"
      :before-upload="checkImg"
      :http-request="upload"
      :file-list="fileList"
      :limit="1"
      :class="{disabled:totalCount}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px" />
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID72h5E6h14qLZVBahX6NN6ZlhLipfEWYJ',
  SecretKey: 'VifLksjqgEVVEgspVt0qPggPs4zcz4sQ'
})
export default {
  data() {
    return {
      showDialog: false,
      // upload组件显示fileList图片。
      fileList: [],
      imgUrl: '',
      uid: null,
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    totalCount() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.showDialog = true
      this.imgUrl = file.url
    },

    removeImg(file, fileList) {
      this.fileList = this.fileList.filter(v => {
        return file.uid !== v.uid
      })
      console.log(file)
    // 删除腾讯云
    //   cos.deleteObject({
    //     Bucket: 'xiaohupo-007-1309004288', /* 填入您自己的存储桶，必须字段 */
    //     Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
    //     Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    //   }, function(err, data) {
    //     console.log(err || data)
    //   })
    },
    // 覆盖默认上传行为，这只执行一次。
    change(file, fileList) {
      //   if (!this.fileList.some(v => v.uid === file.uid)) {
      //     this.fileList.push(file)
      //   }
      this.fileList = fileList.map(item => item)
    },
    // 上传前检查
    checkImg(file) {
      const type = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg']
      const maxSize = 5 * 1024 * 1024
      if (!type.includes(file.type)) {
        this.$message('上传图片格式非法')
        return false
      }

      if (file > maxSize) {
        this.$message('上传图片不能超过5M')
        return false
      }
      this.uid = file.uid
      this.showPercent = true
      return true
    },
    // 只有before-upload成功才能执行
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'xiaohupo-007-1309004288', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            console.log(progressData.percent)
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.uid) {
                // upload所有图片都为true，才可以上传保存
                return { url: `http://${data.Location}`, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }

  }
}
</script>

<style lang='scss'>
.disabled{
    .el-upload--picture-card{
        display: none;
    }
}
</style>
