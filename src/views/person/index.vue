<template>
<!-- 先在这里写视图页面,然后在router/index.js里写路由 -->
    <div class="person">
        <div class="top-wrap">
            <router-link v-if="!userMsg.user" class="login-box" :to="{name: 'login'}">
                <!-- 上面的name:'login'name是和路由里面login里的name:'login'对应 -->
            
            <div class="left">
                <h2>立即登陆</h2>
                <div class="desc">
                    时光回头，当下最重要。
                </div>
            </div>

            <div class="right">
                <img src="@/assets/1.jpeg" alt="" class="avatar">
                <i class="iconfont icon-youbiao"></i>
            </div>
            </router-link><!--login-box end-->

            <div class="login-box user-box" v-else>
                <!-- 上面的name:'login'name是和路由里面login里的name:'login'对应 -->
            
            <div class="left">
                <h2>{{userMsg.user.username || userMsg.user.phone}}</h2>
                <div class="desc">
                    {{userMsg.user.desc || '该用户很懒，还没写个性签名'}}
                </div>
            </div>

            <div class="right">
                <img :src="userMsg.user.avatar|| zhenxiang" alt="" class="avatar">
            </div>
             </div>

            <div class="collection-data">
                <div class="collection-item">
                    <div class="title">
                        {{userMsg.read}}
                        <span class="little-title">本</span>
                    </div>
                    <div class="desc">
                        已读书籍
                    </div>
                </div>
                <div class="collection-item">
                    <div class="title">
                        {{userMsg.collection}}
                        <span class="little-title">本</span>
                    </div>
                    <div class="desc">
                        已收藏书籍
                    </div>
                </div>
                <div class="collection-item">
                    <div class="title">
                        {{userMsg.like}}
                        <span class="little-title">本</span>
                    </div>
                    <div class="desc">
                        喜欢
                    </div>
                </div>
                <i class="col-line"></i>
                <i class="col-line"></i>
            </div>
        </div><!--top-wrap end-->
        <div class="menu">
            <router-link to="changePerson" class="menu-item">
                <div class="menu-item-left">
                    <i class="iconfont icon-xiugaigerenxinxi"></i>
                    <span class="menu-item-text">修改个人信息</span>
                </div>
                <i class="iconfont icon-youbiao"></i>
            </router-link>
            <router-link to="#" class="menu-item">
                <div class="menu-item-left">
                    <i class="iconfont icon-jiazhi1"></i>
                    <span class="menu-item-text">收藏书单</span>
                </div>
                <i class="iconfont icon-youbiao"></i>
            </router-link>
            <router-link to="#" class="menu-item">
                <div class="menu-item-left">
                    <i class="iconfont icon-aihao-"></i>
                    <span class="menu-item-text">喜欢的书</span>
                </div>
                <i class="iconfont icon-youbiao"></i>
            </router-link>

        </div>
        <div class="close">
            <Button type="primary" size="large" style="margin-top:30px; background-color: rgb(238,78,78)">
                退出登录
            </Button>
        </div>
        
    </div>    
</template>

<script>
import zhenxiang from '@/assets/zhenxiang.jpg'
import {Button} from 'mint-ui'
export default {
    name: 'person',
    data () {
        return {
            zhenxiang
        }
    },
    components:{
        Button,
    },
    created () {
       let token = localStorage.getItem('token')
       if(token){
           this.$store.dispatch('getUserMsg')
       }
    },
    computed: {
        userMsg() {
            return this.$store.state.userMsg
        }
    },
}
</script>

<style scoped lang="scss" src="./index.scss"></style>

