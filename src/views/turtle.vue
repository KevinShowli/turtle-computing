<template>
  <div id="turtle">
    <el-tabs v-model="activeIndex" type="card">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <calcPage :index="activeIndex" />
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
  mounted() {},
  methods: {
  }
}
</script>
<style lang="sass" scoped>
</style>
