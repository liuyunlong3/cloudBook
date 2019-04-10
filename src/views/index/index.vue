<template>
  <div class="container">
    <Loadmore :top-method="loadTop" ref="loadmore" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom">
      <MySwiper/>
      <div class="content">
        <ContentItem v-for="(item,index) in contentData" :options="item" :key="index"/>
        <!-- 将options传到这里 -->
      </div>
    </Loadmore>
  </div>
</template>

<script>
import MySwiper from "@/components/my-swiper"; //引入swiper组件
import ContentItem from "./components/contentItem"; //引入contentItem组件
import { Loadmore } from "mint-ui";
import moment from "moment"; //引入处理事件的库

export default {
  name: "index",
  components: {
    MySwiper,
    ContentItem,
    Loadmore
  },
  data() {
    return {
      contentData: [],
      queryData: {
        pn: 1,
        booksSize: 2,
        size: 2
      },
      allLoaded: false
    };
  },
  methods: {
    // 下面用axios请求/category/books下面的数据
    getContent() {
      return new Promise(resolve => {
        this.$axios
          .get(this.$api.getContent, {
            params: this.queryData
          })
          .then(res => {
            let resData = res.data;
            console.log(resData);
            if(resData < this.queryData.size){
              this.allLoaded = true //告诉已经加载完毕
            }
            resData = resData.map(item => {
              item.books = item.books.map(it => {
                it.updateTime = moment(it.updateTime).format("YYYY年M月DD日");
                return it;
              });
                return item;
            });
            this.contentData = [...this.contentData,...resData]; /*
                    原代码:this.contentData = resData;将请求来的数据赋值给contentData[]，因为刷新页面后不会拼接
                    二次代码es5实现拼接：this.contentData = [].concat(this.contentData,resData);
                           es6实现拼接：this.contentData = [...this.contentData,...resData]
            */
            resolve()
          });
      });
    },
    loadTop() {
      // 下拉刷新
      this.queryData = {
        pn: 1,
        booksSize: 4,
        size: 4
      };
      this.allLoaded = false; //因为下拉刷新不需要加载所以重置
      this.getContent().then(()=>{
          this.$refs.loadmore.onTopLoaded()
      });
    },
    // 下滑加载更多
    loadBottom() {
        this.queryData = {
          pn: this.queryData.pn+1,//在手机上可以写成pn:this.queryData.pn++
          booksSize: 2,
          size: 4
        };
        this.getContent().then(()=>{
          this.$refs.loadmore.onBottomLoaded()
        })
    }
  },
  created() {
    this.getContent();
  }
};
</script>

<style scoped lang="scss">
@import "../../globalCss/px2-rem";

.container {
  padding: px2-to-rem(18);
  padding-bottom: 60px;
}
</style>
