<template>
  <div id="turtle">
    <el-tabs v-model="activeIndex" type="card">
      <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <calcPage :index="index + 1" @titleChange="titleChange" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import calcPage from '@/components/calcPage'
export default {
  components: { calcPage },
  data() {
    return {
      activeIndex: '1',
      editableTabs: [
        {
          title: '品种 1',
          name: '1',
        },
        {
          title: '品种 2',
          name: '2',
        },
        {
          title: '品种 3',
          name: '3',
        },
      ],
    }
  },
  mounted() {
    this.editableTabs.forEach((el, ind) => {
      el.title = localStorage.getItem(`${ind + 1}name`) ? localStorage.getItem(`${ind + 1}name`) : `品种 ${ind + 1}`
    })
  },
  methods: {
    titleChange(data) {
      this.editableTabs[data.index - 1].title = data.name
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
