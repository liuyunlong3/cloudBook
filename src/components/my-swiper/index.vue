<template>
  <div>
    <!-- 下面swiper中的内容是轮播图 -->
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in swiperData" :key="index">
        <router-link :to="{name:'details',params:{id:item.book._id}}" class="swiper-img-wrap">
          <!-- 当你看到这里的时候：注意注意注意。。。上面的{name:'details',params:{id:item.book._id}是向views/details页面传文章详情页的id -->
          <img :src="item.img" :alt="item.img" class="swiper-img">
          <div class="title">{{item.title}}</div>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "index",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperData: []
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getSwiper() {
      // 获取接口封装的方法。
      this.$axios.get(this.$api.getSwiper).then(res => {
        this.swiperData = res.data;
      });
    }
  },
  created() {
    // 想要执行这个方法的话就需要写到created里面并且调用方法
    this.getSwiper();
  }
};
</script>

<style scoped lang="scss">
@import "../../globalCss/px2-rem";
.swiper-img-wrap {
  display: block;
  width: 100%;
  text-decoration: none;
  position: relative;
  color: rgba(255, 255, 255, 0.9);
  .swiper-img {
    height: px2-to-rem(400);
  }

.title {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 4px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  }
}
</style>
