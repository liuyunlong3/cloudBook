<template>
    <div class="container login">
        <div class="logo">
            <i class="iconfont icon-xuexipindao"></i>
        </div>
        <div class="inputs-wrap">
            <ly-input v-model="formData.phone" placeholder="请输入您的手机号"></ly-input>
            <ly-input v-model="formData.password" placeholder="请输入您的密码" :type="type">
                 <i class="iconfont icon-yincang" slot="icon" @click="toggleType" :class="{'icon-yincang1': type=='text'}"></i>
            </ly-input>
        </div>
        <div class="router-wrap">
            <router-link to="/register">没有账号？立即注册</router-link>
        </div>
        <Button type="primary" size="large" style="margin-top: 30px;" @click="handleLogin">
            立即登陆
        </Button>
    </div>
</template>

<script>
import lyInput from '@/components/ly-input';
import {Button,Toast} from 'mint-ui';
import validator from 'validator';

export default {
  name: "login",
  components: {
      lyInput,
      Button
  },
  data() {
      return {
          formData: {
              phone: '123',
              password: ''
          },
          type: 'password'
      }
  },
  methods: {
      toggleType () {
          this.type = this.type=='password'?'text':'password'
      },
      handleLogin () {
          let phoneStatus = validator.isMobilePhone(this.formData.phone,'zh-CN')
          let passwordStatus = validator.isLength(this.formData.password,{min: 6})
          if(phoneStatus&&passwordStatus){
              this.$axios.post(this.$api.login,this.formData).then(res=>{
                  if(res.code==200){//登陆成功
                        let token = res.token
                        localStorage.setItem('token',token)//记录用户的token信息
                      Toast({//登陆成功的提示
                          message: '登陆成功'
                      })
                      setTimeout(()=>{//0.8秒后跳转到person页面
                          this.$router.push({
                              name: 'person'
                          })
                      },800)
                  } else {//登录失败
                      Toast({//弹出失败信息
                          message: res.msg
                      })
                  }
              })
          } else {
              Toast({
                  message: '不是合法的手机号码或者密码长度不够六位'
              })
          }
      },
  },
};
</script>

<style scoped lang="scss" src="./index.scss"></style>


