<template>
    <div>
        <router-view />
        <LyTabbar /> 
    </div>
</template>

<script>
import LyTabbar from '@/components/tab-bar'
export default {
    name: 'layout',
    components: {
        LyTabbar
    }
}
</script>

<style>

</style>
