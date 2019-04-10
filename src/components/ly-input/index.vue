<template>
    <div class="ly-class-wrap">
        <slot name="icon">
            <i class="iconfont icon-renwu"></i>
        </slot>
        <label>
            <input type="text" v-model="currentValue" v-if="type=='text'" :placeholder="placeholder">
            <input type="password" v-model="currentValue" v-else :placeholder="placeholder">
        </label>
        <slot name="right">
            <i class="iconfont"></i>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: {
        value: [String,Number],
        type: {
            default: 'text'
        },
        placeholder: String,
        max: Number
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    // 为了实现双向数据绑定用watch和上面的currentValue进行绑定
    watch: {
        // 下面是将值传出去
        currentValue (newValue,oldValue) {
            if(this.max){
                if(newValue.length>this.max){
                    this.currentValue = oldValue;
                }
            }
            this.$emit('input',newValue)
        },
        // 下面是实现立刻赋值
        value: {
            immediate: true,
            handler (val) {
                this.currentValue = val;
            } 
        }
    },
}
</script>

<style scoped lang="scss" src="./index.scss"></style>


