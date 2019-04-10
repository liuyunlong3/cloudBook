<template>
    <div class="container">
       <ul class="titles">
           <li class="title-item" v-for="(item,index) in titles" :key="index">
               <router-link :to="{name:'article', params:{id:item._id}}">
                   {{item.title}}
               </router-link>
           </li>
       </ul>
    </div>
</template>

<script>
export default {
    name: 'titles',
    data () {
        return {
            titles: [],
            bookData: {}
        }
    },
    methods: {
        getTitles () {
            const id = this.$route.params.id
            this.$axios.get(this.$api.getTitle + id).then(res=>{
                this.titles = res.data;
                console.log(res);
            })
        },
        getBookData () {
            const id = this.$route.params.id //获取id
            this.$axios.get(this.$api.getBook+id).then(res=>{
                let resData = res.data;
                this.bookData = resData;
                document.title = this.bookData.title +'--'+'目录'
                // console.log(res); 这里可以将res的结在控制台上打印出来
            })
        },
    },
    created() {
        this.getTitles();
        this.getBookData();
    },
}
</script>

<style scoped lang="scss">
    .title-item {
        line-height: 40px;
        font-weight: 40px;
        padding-left: 10px;
        border-bottom: 1px solid #e0e0e0;
        a {
            color: #333;
        }
    }
</style>
