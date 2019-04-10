<template>
    <div class="container">
        <div id="dom"></div>
        <div class="content markdown" :style="{fontSize: fontSize + 'px'}" v-html="html" ></div>
        <div class="btns">
            <!-- 下面是5个icon -->
            <i class="iconfont icon-prev" @click="handleJump('prev')"></i>
            <i class="iconfont icon-mulu" @click="showTitles"></i>
            <i class="iconfont icon-zitifangda" @click="handleAdd"></i>
            <i class="iconfont icon-zitisuoxiao" @click="handleReduce"></i>
            <i class="iconfont icon-next" @click="handleJump('after')"></i>
        </div>
        <div class="title-wrap" v-show="isShowTitles" @click="hideTitles">
            <!-- 背景为浅黑色 -->
            <transition name="slide">
                <ul class="titles" v-show="isActive" @click.stop>
                    <!-- 里面的白色目录，上面的@click是防止冒泡 -->
                    <li v-for="(item,index) in titles" :key="index" class="title-item">
                        <!-- 内容 -->
                        {{item.title}}
                    </li>
                </ul>
            </transition>
           
        </div>
    </div>
</template>

<script>
import Showdown from 'showdown'
import {Toast} from 'mint-ui'
export default {
    name: 'ly-article',
    data () {
        return {
            article: {},
            html: '',
            fontSize: 48,
            titles: [],
            index: -1,
            isShowTitles: false,
            isActive: false
        }
    },
    methods: {
        getArticle (itemId) {
            return new Promise((resolve)=>{ //写他意思就是先实现getArticle，再实现getTitles
                const id = itemId?itemId:this.$route.params.id //这里忘了写$route会报错，报params的错
                this.$axios.get(this.$api.getArticle + id).then (res=>{
                const converter = new Showdown.Converter()
                this.html = converter.makeHtml(res.data.article.content)
                this.article = res.data
                this.index= res.data.article.index;
                console.log(this.index);
                resolve()
              })
            })
        },
        handleAdd () {
            if(this.fontSize>=84){
                Toast({
                    message:'字体太大了，'
                })
            } else
            this.fontSize += 2;
        },
        handleReduce () {
            if(this.fontSize <= 42)
            {
                Toast({
                    message: '已达到极限字体，不能再缩小，可能对眼睛有损伤',
                    // position: 'bottom', 表示字显示的位置
                    duration: 2000 //表示字显示的时间
                });
            } else
            this.fontSize -= 2;
        },
        getTitles () {
            const id= this.article.article.bookId
            this.$axios.get(this.$api.getTitle+id).then( res => { //记录：箭头函数写错了的话，this无法变成this.article.
                 this.titles = res.data;
                 console.log(this.titles)
            })
        },
        handleJump (isPrev) {
            const _this = this
            function getArticleByIndex () {
                const item =  _this.titles.find(item=>item.index==_this.index) //从titles里找到index得到item（当前标题）
                const id = item._id;
                _this.getArticle(id)
                //下面的代码是解决刷新页面，用户看的进度消失的问题：解决的方法是在点击上一页下一页后更新地址栏的id
                _this.$router.push({
                    name: 'article',
                    params: {
                        id
                    }
                }) 
            }
            if(isPrev=='prev'){
               //if(this.article.article.index==0){
            if(this.index==0){
                Toast({
                    message: '是第一页，不能再往前面了',
                    duration: 1500
                })
            } 
             else{
                // this.article.article.index= this.article.article.index -1
                this.index--
                getArticleByIndex()
               }
            }
            else if(isPrev=='after'){
                if(this.index==this.titles.length){
                    Toast({
                        message: '是最后一页，不能再往后了',
                        duration: 1500
                    })
                }
                else{
                    this.index++
                    getArticleByIndex()
                }
            }
        },
        showTitles () {
            this.isShowTitles = true
            this.isActive = true
        },
        hideTitles () {
            this.isActive = false
            setTimeout(() => {
                this.isShowTitles = false
            }, 500);
        },
    }, 
    created() {
        this.$nextTick(()=>{
            console.log(document.querySelector('#dom'));
        })
        
        this.getArticle().then(()=>{
            this.getTitles()
            }
        );
    },
}
</script>

<style scoped lang="scss">
    @import '../../globalCss/px2-rem.scss';
    .btns {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid #eee;
        background: #fff;
        .iconfont {
            flex: 1;
            color: #333;
            font-size: 28px;
            text-align: center;
            height: 42px;
            line-height: 42px;
        }
    }
    .title-wrap {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0, .5);
        .titles {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0; 
            width: 60%;
            height: 100%;
            background: #fff;
        };
        .title-item {
            padding: 10px;
            border: 1px solid #eee;
           
        };
        .slide-enter, .slide-leave-to {
            transform: translate3d(-100%,0,0);
        };
        .slide-enter-article, .slide-leave-active {
            transition: transform .5s ease;
        }
    }
</style>

<style lang="scss">
    @import './markdown.scss';
    .container {
        padding-bottom: 63px;
    }
</style>


