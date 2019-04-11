<template>
    <div class="container changePerson">
        <ul class="user-msg-list">
            <li class="user-msg-item">
                <hs-upload to="#" class="item-content">
                    <div class="item-left">
                        头像
                    </div>
                    <div class="item-right">
                        <img src="" alt="默认头像" class="img">
                        <i class="iconfont icon-youbiao"></i>
                    </div>
                </hs-upload>
            </li>
             <li class="user-msg-item">
                <router-link to="#" class="item-content">
                    <div class="item-left">
                        昵称
                    </div>
                    <div class="item-right">
                        <span>111111</span>
                        <i class="iconfont icon-youbiao"></i>
                    </div>
                </router-link>
            </li>
             <li class="user-msg-item">
                <router-link to="#" class="item-content">
                    <div class="item-left">
                       个性签名
                    </div>
                    <div class="item-right">
                        <span>这家伙很懒，什么都没写</span>
                        <i class="iconfont icon-youbiao"></i>
                    </div>
                </router-link>
            </li>
             <li class="user-msg-item">
                <router-link to="#" class="item-content">
                    <div class="item-left">
                        修改密码
                    </div>
                    <div class="item-right">
                        
                        <i class="iconfont icon-youbiao"></i>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import zhenxiang from '@/assets/zhenxiang.jpg'
import hsUpload from '@/components/hs-upload'
export default {
    neme: 'changePerson',
    components: {
        hsUpload,
    }
}
</script>

<style lang="sass" scoped src="./index.scss"></style>

