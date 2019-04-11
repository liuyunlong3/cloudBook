<template>
    <div>
        <hs-upload>
            <div>上传文件</div>
            <!-- 上面如果写button标签的话，因为button有一个默认行为，所以上传文件会失败。 -->
        </hs-upload>
    </div>
</template>

<script>
import hsUpload from '@/components/hs-upload';
export default {
    name: 'test',
    components: {
        hsUpload
    }
}
</script>

<style>

</style>
