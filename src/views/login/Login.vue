<template>
    <div class="login-register">
        <div class="sys-logo"></div>
        <div v-if="isLogin" class="login-form">
            <div class="x-el-form">
                <el-form :model="user" :rules="loginRules" status-icon ref="loginForm" label-width="1rem">
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
                        <div class="x-el-item-captcha">
                            <el-input v-model="user.captcha" placeholder="Please input the captcha" style="width: 20rem;">
                                <div slot="prepend" class="fa fa-sign-language fa-lg" style="width: 1rem;"></div>
                            </el-input>
                            <div class="captcha-img">
                                <canvas id="canvas" @click="refreshCaptcha"></canvas>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="doLogin">Login</el-button>
                        <el-button type="info" @click="skipToRegister">Register</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
        <div v-else class="register-form">
            <div class="x-el-form-register">
                <el-form :model="newUser" label-width="10rem" status-icon :rules="registerRules" ref="registerForm">
                    <el-form-item prop="userName" class="x-el-register-item">
                        <span slot="label" class="x-el-label">Account-ID</span>
                        <div class="x-el-register-item-input">
                            <el-input v-model="newUser.userName" placeholder="Please choose your ID"></el-input>
                            <span class="x-el-input-desc">(0~32 letters/numbers/_ group)</span>
                        </div>
                    </el-form-item>
                    <el-form-item prop="email" class="x-el-register-item">
                        <span slot="label" class="x-el-label">Email</span>
                        <div class="x-el-register-item-input">
                            <el-input v-model="newUser.email" placeholder="Please set your own valid email"></el-input>
                            <span class="x-el-input-desc">(Personal email address)</span>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password" class="x-el-register-item">
                        <span slot="label" class="x-el-label">Password</span>
                        <div class="x-el-register-item-input">
                            <el-input v-model="newUser.password" placeholder="Please set your password" type="password"></el-input>
                            <span class="x-el-input-desc">(6-20 letters/numbers group)</span>
                        </div>
                    </el-form-item>
                    <el-form-item prop="repeatPassword" class="x-el-register-item">
                        <span slot="label" class="x-el-label">Confirm Password</span>
                        <div class="x-el-register-item-input">
                            <el-input v-model="newUser.repeatPassword" placeholder="Please confirm your password" type="password"></el-input>
                            <span class="x-el-input-desc">(Confirm password above)</span>
                        </div>
                    </el-form-item>
                    <el-form-item class="x-el-register-item">
                        <div class="x-el-register-item-input" style="margin-top: 2rem;">
                            <span class="login-link">Go <a href="#" @click="navigateToLogin">login</a></span>
                            <el-button type="primary">Sign in</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
    function getRandomCaptcha(){
        let captcha = '';
        for(let count = 0; count < 5; count++){
            let seed = Math.floor(Math.random() * 10) % 2;
            let caseSeed = Math.floor(Math.random() * 10) % 2;
            let numPos = Math.floor(Math.random() * 10);
            let charPos = Math.floor(Math.random() * 26);
            let char = String.fromCharCode(seed == 0 ? ('0'.charCodeAt() + numPos) : ((caseSeed == 0 ? 'a'.charCodeAt() : 'A'.charCodeAt()) + charPos));
            captcha = captcha + char;
        }
        return captcha;
    };
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    function fillCanvas(captcha) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        let cw = canvas.width;
        let ch = canvas.height;

        ctx.textBaseline = "middle";
        ctx.fillStyle = randomColor(180, 240);
        ctx.fillRect(0, 0, cw, ch);

        for(var i = 1; i <= captcha.length; i++) {
            var txt = captcha[i - 1];
            ctx.font = '80px Arial';
            ctx.fillStyle = randomColor(0, 255); //随机生成字体颜色
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            var x = cw / 6 * i;
            var y = ch / 2;
            var deg = randomNum(-30, 30);
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, -20, 0);
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }

        /**绘制干扰线**/
        for(var i = 0; i < 4; i++) {
            ctx.strokeStyle = randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(randomNum(0, cw/2), randomNum(0, ch/2));
            ctx.lineTo(randomNum(0, cw/2), randomNum(0, ch));
            ctx.stroke();
        }
        /**绘制干扰点**/
        for(var i = 0; i < cw/4; i++) {
            ctx.fillStyle = randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(randomNum(0, cw), randomNum(0, ch), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

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
                } else {
                    callback();
                }
            };
            var checkPassword = (rule, value, callback) => {
                if(value === '' || value === undefined){
                    callback('Password cannot be empty!');
                } else {
                    callback();
                }
            };
            var checkCaptcha = (rule, value, callback) => {
                if(value === '' || value === undefined){
                    callback('Captcha cannot be empty!');
                } else if(value.toLowerCase() != this.captcha.toLowerCase()){
                    callback('Captcha is wrong, Please check!');
                } else {
                    callback();
                }
            };

            var checkRegisterUserName = (rule, value, callback) => {
                if(value === '' || value === undefined){
                    callback("Account name cannot be empty!");
                }
            };
            var checkRegisterPassword = (rule, value, callback) => {

            };
            var checkRepeatPassword = (rule, value, callback) => {

            };

            return {
                isLogin : true,
                user: {
                    userName: '',
                    password: '',
                    captcha: '',
                    role: '',
                },
                newUser : {userName : '', password : '', email : '', repeatPassword : ''},
                loginRules: {
                    userName : [{validator : checkUserName, required: true, trigger : 'blur'}],
                    password : [{validator : checkPassword, required: true, trigger : 'blur'}],
                    captcha : [{validator : checkCaptcha, required: true, trigger : 'blur'}]
                },
                registerRules: {
                    userName : [{validator : checkRegisterUserName, required: true, trigger: 'blur'}],
                    password : [{validator : checkRegisterPassword, required: true, trigger: 'blur'}],
                    repeatPassword : [{validator : checkRepeatPassword, required: true, trigger: 'blur'}]
                }
            };
        },
        methods : {
            doLogin(){
                this.$refs.loginForm.validate(valid => {
                    if(valid){

                    } else {
                        this.$message({message : '请确认必填信息!', type : 'error'})
                    }
                })
            },
            skipToRegister(){
                this.isLogin = false;
                this.$nextTick(()=>{ this.$refs.registerForm.resetFields(); });
            },
            refreshCaptcha(){
                this.$store.dispatch('commitUpdateCaptcha', getRandomCaptcha()).then(() => {}).catch(() => {});
                fillCanvas(this.captcha);
            },
            navigateToLogin(){
                this.isLogin = true;
                this.$nextTick(()=>{
                    this.$refs.loginForm.resetFields();
                    this.refreshCaptcha();
                });
            }
        },
        mounted(){
            this.$store.dispatch('commitUpdateCaptcha', getRandomCaptcha()).then(() => {}).catch(() => {});
            fillCanvas(this.captcha);
        },
        computed : {
            loginUrl(){
                return this.$store.getters.LOGIN_URL;
            },
            captcha(){
                return this.$store.getters.CAPTCHA;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../style/main";

    $loginWidth: 35rem;
    $loginHeight: 25rem;
    $sysLogoWidth:7rem;
    $sysLogoHeight: 7rem;

    *{@include user-select;}

    .login-register{
        @include margin-t-r-b-l(5rem, null, null, calc(50% - 20rem));
        @include padding-tb-rl(null, 5rem);
        display: flex; flex-direction: column;

        .sys-logo{
            @include width-height($sysLogoWidth, $sysLogoHeight);
            background: url("../../assets/logo-title.jpg");
            background-size: 100% 100%;
            border-radius: 7rem;
            opacity: .4;
        }

        .login-form {
            @include width-height($loginWidth, $loginHeight);
            @include margin-t-r-b-l(2rem, null, null, null);
            background-color: rgba(65,255,228,0.3);
            border-radius: 10px;
            padding-top: 1rem;
            .x-el-form{
                @include margin-t-r-b-l(5rem, 5rem, null, 5rem);
                .x-el-item{
                    @include width-height(25rem, null);
                    .x-el-item-captcha{
                        display: flex; flex-direction: row;
                        .captcha-img{
                            margin-left: 1rem;
                            @include width-height(4rem, 2.5rem);
                            #canvas{
                                @include width-height(4rem, 2.5rem);
                            }
                        }
                    }
                }
            }
        }

        .register-form{
            @include width-height(50rem, 35rem);
            @include margin-t-r-b-l(2rem, null, null, null);
            background: rgba(41,235,255,0.3);
            border-radius: 5px;
            .x-el-form-register{
                @include padding-t-r-b-l(1rem, null, null, null);
                @include margin-t-r-b-l(2.5rem, null, null, 2.5rem);
                .x-el-register-item{
                    @include width-height(40rem, null);
                    .x-el-label{
                        color: rgba(247,246,245,0.91);
                        font-size: 1.1rem;
                    }
                    .x-el-register-item-input{
                        display: flex; flex-direction: row;
                        @include width-height(30rem, null);
                        .x-el-input-desc{
                            display: block;
                            font-size: .1rem;
                            @include width-height(17rem, null);
                            color: rgba(247,246,245,0.7);
                        }

                        .login-link{
                            display: block;
                            font-size: 1rem;
                            margin-right: 2rem;
                            a{
                                font-size: 1.2rem;
                            }
                        }
                    }


                }

            }
        }
    }

</style>
