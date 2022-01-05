<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <page-tool :show-before="true">
      <template v-slot:before>
        <span>我想你们</span>
      </template>
      <template v-slot:after>
        <el-button type="primary">点击</el-button>
      </template>
    </page-tool>
    <upload-excel />
    <image-upload />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',

  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
