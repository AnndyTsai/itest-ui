<template>
    <div class="login-form">
        <el-form :model="user" :rules="loginRules" status-icon ref="loginForm" label-width="1rem" class="x-el-form">
            <el-form-item label=" " prop="userName" class="x-el-item">
                <el-input v-model="user.userName" placeholder="Please input your account name">
                    <div slot="prepend" class="fa fa-user-circle fa-lg" style="width: 1rem;"></div>
                </el-input>
            </el-form-item>
            <el-form-item label=" " prop="password" class="x-el-item">
                <el-input v-model="user.password" placeholder="Please input your account password">
                    <div slot="prepend" class="fa fa-lock fa-2x" style="width: 1rem;"></div>
                </el-input>
            </el-form-item>
            <el-form-item label=" " prop="captcha" class="x-el-item">
                <el-input v-model="user.captcha" placeholder="Please input the captcha">
                    <div slot="prepend" class="fa fa-sign-language fa-lg" style="width: 1rem;"></div>
                </el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doLogin">Login</el-button>
                <el-button type="info" @click="doRegister">Register</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            /**
             * Here is the place where the component's global variable address. Like checkUserName, checkPassword, checkCaptcha.
             * 定义类似类属变量
             */
            var checkUserName = (rule, value, callback) => {
                if(value === '' || value === undefined){
                    callback('Account name cannot be empty!');
                }
            };
            var checkPassword = (rule, value, callback) => {
                if(value === '' || value === undefined){
                    callback('Password cannot be empty!');
                }
            };
            var checkCaptcha = (rule, value, callback) => {
                if(value === '' || value === undefined){
                    callback('Captcha cannot be empty!');
                }
            };
            return {
                user: {
                    userName: '',
                    password: '',
                    captcha: '',
                    role: '',
                },
                loginRules: {
                    userName : [{validator : checkUserName, required: true, trigger : 'blur'}],
                    password : [{validator : checkPassword, required: true, trigger : 'blur'}],
                    captcha : [{validator : checkCaptcha, required: true, trigger : 'blur'}]
                },
            };
        },
        methods : {
            doLogin(){
                console.log(this.loginUrl);
            },
            doRegister(){

            }
        },
        computed : {
            loginUrl(){
                return this.$store.getters.LOGIN_URL;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../style/main";
    *{@include user-select;}
    .login-form {
        @include width-height(35rem, 30rem);
        @include margin-tb-rl(10%, calc(50% - 15rem));
        background-color: rgba(65,255,228,0.3);
        border-radius: 10px;
        .x-el-form{
            @include margin-t-r-b-l(5rem, 5rem, 4rem, 5rem);
            .x-el-item{
                @include width-height(25rem, null);
            }
        }
    }

</style>
