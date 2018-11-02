<template>
    <div class="x-home">
        <div class="x-nav">
            <div class="x-nav-home-icon" @click="goSpecificPart($event)" :id="menus.home"><img src="../../assets/icon/home-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>Home</div>
            <div class="x-nav-sys-icon" @click="goSpecificPart($event)" :id="menus.setting"><img src="../../assets/icon/settings-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>Settings</div>
            <div class="x-nav-ui-icon" @click="goSpecificPart($event)" :id="menus.ui"><img src="../../assets/icon/ui-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>UI Test</div>
            <div class="x-nav-api-icon" @click="goSpecificPart($event)" :id="menus.api"><img src="../../assets/icon/api-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>API Test</div>
            <div class="x-nav-ops-icon" @click="goSpecificPart($event)" :id="menus.ops"><img src="../../assets/icon/ops-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>OPS</div>
            <div class="x-nav-tool-icon" @click="goSpecificPart($event)" :id="menus.tool"><img src="../../assets/icon/tool-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>Tools</div>
            <div class="x-nav-about-icon" @click="goSpecificPart($event)" :id="menus.about"><img src="../../assets/icon/about-icon.png" style="width: 1rem; height: 1rem; margin-right: 2px;"/>About</div>
            <div class="x-nav-other-icon">
                <div class="x-other-time">{{currentDateTime}}</div>
                <div class="x-other-user"><i class=" fa fa-user-o" style="color: rgba(208,245,255,0.91);"></i>
                    <el-dropdown  trigger="click">
                        <span style="font-size: 1.2rem; color: rgba(139,255,201,0.91);"> {{currentUser.userName}}<i class="el-icon-arrow-down" style="font-size: .8rem;"></i></span>
                        <el-dropdown-menu slot="dropdown"  style="background-color: rgba(27,135,227,0.91); ">
                            <el-dropdown-item style="color: slategray;">logout</el-dropdown-item>
                            <el-dropdown-item style="color: slategray;">setting</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="x-main">
            <basic-setting v-if="activeIcon === menus.setting"></basic-setting>
        </div>
    </div>
</template>

<script>
    import BasicSetting from './settings/Settings';
    export default {
        name: 'Home',
        components: {BasicSetting},
        data(){
            return{
                menus : {home : 'home', setting : 'sysSettingIcon', ui: 'ui', api : 'api', ops : 'ops', tool : 'tool', about : 'about'},
                activeIcon : '',
                currentDateTime : '',
            }
        },
        methods : {
            goSpecificPart(event){
                this.activeIcon = event.target.id;
            },
        },
        computed : {
            //项目列表
            projectList(){return this.$store.getters.PROJECT_LIST;},
            //当前激活选中的项目
            activeProject(){return this.$store.getters.ACTIVE_PROJECT;},
            //当前登录用户
            currentUser(){return this.$store.getters.CURRENT_USER;},
        },
        mounted(){
            setInterval(() => this.currentDateTime = this.commonUtils.getFormatDate('hh:mi:ss w', new Date()), 1000);
        }
    };
</script>

<style lang="scss">
    @import "../../style/main";
    $navHeight : 3rem;
    $navMainGap : 0.5rem;
    $mainHeight : calc(100% - 3.5rem);

    *{@include user-select}
    .x-home{
        @include width-height(100%, 100%);
        background: url("../../assets/home-mountain.jpg");
        background-size: 100% 100%;
        .x-nav{
            @include width-height(90%, $navHeight); line-height: 3rem;
            @include margin-tb-rl(null, 5%);
            background-color: rgba(0,0,0,0.2);
            display: flex; flex-direction: row;
            div.x-nav-home-icon, div.x-nav-sys-icon, div.x-nav-ui-icon, div.x-nav-api-icon, div.x-nav-about-icon, div.x-nav-ops-icon, div.x-nav-tool-icon{
                @include width-height(6rem, 100%);
                @include margin-tb-rl(null, 2px);
                box-shadow: 0 0 1rem 0 rgba(251,255,249,0.5);
                @include padding-tb-rl(null, 5px);
                text-align: center;
                border-radius: 1px;
                font-size: 1.2rem;
                &:hover{
                    box-shadow: 0 0 2rem 0 rgba(251,255,249,1);
                    cursor: pointer;
                    font-weight: bold;
                }
            }
            .x-nav-home-icon{
                background-color: rgba(122,188,187,1);
                color: white;
            }
            .x-nav-sys-icon{
                background-color: rgba(35,34,32,0.5);
                color: rgba(255,197,20,0.91);
            }
            .x-nav-ui-icon{
                background-color: rgba(47,65,77,0.5);
                color: rgba(200,248,248,0.91);
            }
            .x-nav-api-icon{
                background-color: rgba(246,246,246,0.8);
                color: rgba(47,65,77,0.91);
            }
            .x-nav-ops-icon{
                background-color: rgba(255,255,255,0.91);
                color: rgba(255,97,4,0.91);
            }
            .x-nav-tool-icon{
                background-color: rgba(255,255,255,0.7);
                color: rgba(0, 0, 0, .5);
            }
            .x-nav-about-icon{
                background-color: rgba(76,65,49,0.5);
                color: rgba(44,56,52,0.91);
            }
            .x-nav-other-icon{
                flex-grow: 2;
                display: flex;
                flex-direction: row-reverse;
                .x-other-user{
                    @include width-height(6rem, 100%);
                    @include text-ellipse;
                    text-align: right;
                    line-height: 3rem;
                    color: rgba(139,255,201,0.91);
                }
                .x-other-time{
                    @include width-height(12rem, 100%);
                    color: rgba(255,253,209,0.91);
                    font-weight: bold;
                }
            }
        }

        .x-main{
            @include margin-t-r-b-l($navMainGap, null, null, null);
            @include width-height(100%, $mainHeight);
        }
    }
</style>
