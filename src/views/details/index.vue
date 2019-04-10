<template>
    <div class="container"> 
        <div class="book">
            <div class="book-left">
                <img :src="bookData.img" :alt="bookData.img" class="img">
            </div>
            <div class="book-right">
                <h2 class="title">
                    {{bookData.title}}
                </h2>
                <div class="book-msg">
                    <div class="author">
                       作者：{{bookData.author}}
                    </div>
                    <div class="looknums">
                       {{bookData.looknums}}人在看
                    </div>
                    <div class="like">
                       {{bookData.startsnums}}人喜欢
                    </div>
                </div>
            </div>
        </div>

        <div class="btns">
            <Button size="small">加入收藏</Button>
            <Button size="small">分享好友</Button>
        </div>

        <div class="line"></div>

        <div class="book-title">
            {{bookData.title}}
        </div>

        <div class="book-desc">
            {{bookData.desc}}
        </div>

        <div class="showtitles">
            <h2 class="title">
                查看目录
                <span>共{{totalTitles}}章</span>
            </h2>
            <div class="date">
                {{bookData.updateTime}}
            </div>
        </div>

        <div class="line"></div>

        <div class="read-btn">
            <Button type="primary" size="large" @click="handleJump">阅读该书籍</Button>
            <!-- 注意注意：：：：：上面的click事件跳转页面需要写 -->
        </div>
    </div>
</template>

<script>
import {Button} from 'mint-ui'
import moment from 'moment'

export default {
    name: "Ly-details",
    components: {
        Button
    },
    data () {
        return {
            bookData: [],
            totalTitles: []
        }
    },
    methods: {
        getBookData () {
            const id = this.$route.params.id //获取id
            this.$axios.get(this.$api.getBook+id).then(res=>{
                let resData = res.data;
                resData.updateTime= moment(resData.updateTime).format('YYYY年M月D日')
                this.bookData = resData;
                this.totalTitles = res.length;
                console.log(res);
            })
        },
        handleJump () {
            this.$router.push({
                name: 'titles',
                params: {
                    id: this.bookData._id
                }
            })
        }
    },
    created () {
        this.getBookData();
    },
}
</script>

<style scoped lang="scss">  
// 上面的scoped是作用域，lang好像就需要些，不然就无法正常给标签写样式
@import '../../globalCss/px2-rem';

    .container {
        padding-bottom: 51px;
    }

    .book {
        display: flex;
        justify-content: space-between;
        
        .book-left {
            width: px2-to-rem(200);
            height: px2-to-rem(266);
            box-shadow: 0 0 2px 2px rgba(0, 0, 0, .5);
        }
        .book-right {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            flex: 1;
            margin-left: 10px;
            .title {
                font-size: 16px;
                font-weight: 500;
            }
            .book-msg {
                flex: 1;
                margin-top: 26px;
                margin-left: 6px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color:#555;
                font-size: 12px;
            }
        }
    }
    .btns {
        display: flex;//使用flex布局
        justify-content: space-between;//用于设置对齐方式为行之间留有空白。
        margin-top: 20px;//距离外边距为20px
        align-items: center;
        //下面是使用mint-ui的插件，此种插件是使用hash和属性选择器结合避免类名相冲突，造成无法写样式：：：有两种方式将样式修改
        // 第一种：利用/deep/:深度选择器
        /deep/ .mint-button-text {
            font-size: 12px;
            color:#555;
        }
        .mint-button {
            width: 100px;
            height: 26px;
        }
    }
    .line{
        height: 6px;
        background: #e0e0e0;
        margin-top: 20px;
    }
    .book-title {
        margin-top: 20px;
        font-size: 16px;
        font-weight: 700;
        color:#333;
    }
    .book-desc {
        margin-top: 16px;
        font-size: 12px;
        line-height: 2;
        color: #333;
    }
    .showtitles {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .title {
           font-size: 16px;
           font-weight: 700;
           color: #333; 
           span {
               font-size: 12px;
               margin-left: 20px;
           }
        }
        .date {
            font-size: 12px;
            color: #555;
        }
    }
    
    .read-btn {
        position: fixed;
        left:0;
        right: 0;
        bottom: 10px;
        padding: 0 px2-to-rem(18);
    }

    /deep/ .mint-button-text {
        font-size: 12px;
    }

    /deep/ .mint-button {
        height: 28px;
    }
</style>

<style>
/* 第二种：直接写一个style */
    /* .btns .mint-button-text {
        font-size: 12px;
        color: #555;
    } */
</style>
