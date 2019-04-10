<template>
<!-- 一切以开发效率优先，一切以开发效率优先，不要写多份相同的样式,在此页面就直接调用login页面的样式 -->
    <div class="container register">
        <div class="logo">
            <i class="iconfont icon-xuexipindao"></i>
        </div>
        <div class="inputs-wrap">
            <ly-input v-model="formData.phone" placeholder="请输入您的手机号"></ly-input>
            <ly-input v-model="formData.password" placeholder="请输入您的密码" :type="type">
                 <i class="iconfont icon-yincang" slot="icon" @click="toggleType" :class="{'icon-yincang1': type=='text'}"></i>
            </ly-input>
             <ly-input :max="6" v-model="formData.code" placeholder="请输入验证码" type="tel">
                 <i class="iconfont icon-yanzhengma" slot="icon"></i>
                 <Button size="small" slot="right" @click="sendCode">
                     {{btnText}}
                 </Button>
            </ly-input>
        </div>
        <div class="router-wrap">
            <router-link to="/login">已有账号?立即登陆</router-link>
        </div>
        <Button type="primary" size="large" style="margin-top: 30px;" @click="handleRegister">
            立即注册
        </Button>
    </div>
</template>

<script>
import lyInput from '@/components/ly-input';
import {Button,Toast} from 'mint-ui';
import validator from 'validator';

export default {
  name: "register",
  components: {
      lyInput,
      Button
  },
  data() {
      return {
          formData: {
              phone: '123',
              password: '',
              code: ''
          },
          btnText: '获取验证码',
          type: 'password',
          isSendCode: false
      }
  },
  methods: {
      toggleType () {
          this.type = this.type=='password'?'text':'password'
      },
      sendCode () {
          if(validator.isMobilePhone(this.formData.phone,'zh-CN')){
            this.isSendCode = true;
            let seconds = 60;
            let timer = setInterval(()=>{
            seconds--
            this.btnText = `再次获取${seconds}s`
            if(seconds==0){
                clearInterval(timer)
                this.btnText='获取验证码'
            }
            },1000)
                this.$axios.post(this.$api.sendCode,{
                    phone: this.formData.phone
                }).then(res=>{
                    Toast({
                        message: res.msg,
                        duration: 500
                    })
                })
            }else {
                Toast({
                    message: '不是合法的手机号',
                    duration: 500
                })
            }
      },
      handleRegister () {
          let phoneStatus = validator.isMobilePhone(this.formData.phone,'zh-CN')
          let passwordStatus = validator.isLength(this.formData.password,{min: 6})
          if(phoneStatus&&passwordStatus&&this.isSendCode){
              this.$axios.post(this.$api.register,this.formData).then(res=>{
                  if(res.code==200){
                      Toast({
                          message: res.msg,
                          duration: 1000
                      })
                      setTimeout(()=>{
                          this.$router.push('/login')
                      },1000)
                  } else {
                      Toast({
                          message: res.msg,
                          duration: 1000
                      })
                  }
              })
          } else {
              Toast({
                  message: '请确保手机号正确，并获取六位验证码，且密码大于六位',
                  duration: 2000
              })
          }
      },
  },
};
</script>

<style scoped lang="scss" src="../login/index.scss"></style>
