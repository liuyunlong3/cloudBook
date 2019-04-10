<template>
  <div>
    <!-- 这里是tabbar组件页面，然页面显示mint-ui中的内容 -->
    <Tabbar v-model="selected" :fixed="true">
      <TabItem id="index">
        <i class="iconfont icon-home" slot="icon"></i>
        首页
      </TabItem>
      <TabItem id="learn">
        <i class="iconfont icon-xuexi-" slot="icon"></i>
        我的学习
      </TabItem>
      <TabItem id="person">
        <i class="iconfont icon-renwu" slot="icon"></i>
        个人中心
      </TabItem>
    </Tabbar>
  </div>
</template>

<script>
import "mint-ui/lib/tabbar/style.css";
import "mint-ui/lib/tab-item/style.css";
import { Tabbar, TabItem } from "mint-ui";

export default {
  name: "tab-bar",
  components: {
    Tabbar,
    TabItem
  },
  data() {
    return {
      selected: 'index'
    };
  },
  // 下面的watch是实现个人中心和首页的点击跳转
  watch: {
    selected (val) {
      this.$router.push({
        name: val
      })
    }
  },
  created() {
    this.selected = this.$route.name
  },
};
</script>

<style>
.iconfont {
    font-size: 26px;
}
</style>
