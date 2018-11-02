<template>
    <div class="x-basic">
        <div class="x-basic-menu">
            <div class="x-basic-menu-item" :id="settingItems.system" style="background-color: rgba(69,198,227,0.7);" @click="goSetting($event)">System Settings</div>
            <div class="x-basic-menu-item" :id="settingItems.parameter" style="background-color: rgba(123,227,111,0.7)" @click="goSetting($event)">Parameter Setting</div>
            <div class="x-basic-menu-item" :id="settingItems.project" style="background-color: rgba(227,50,16,0.7)" @click="goSetting($event)">Project Settings</div>
            <div class="x-basic-menu-item" :id="settingItems.server" style="background-color: rgba(63,11,227,0.7)" @click="goSetting($event)">Server Settings</div>
        </div>
        <div class="x-basic-gap"></div>
        <div class="x-basic-content">
            <project-setting v-if="activeSettingItem === settingItems.project"></project-setting>
        </div>
    </div>
</template>

<script>
    import ProjectSetting from './ProjectSetting';
    export default {
        name: 'BasicSetting',
        components: {ProjectSetting},
        data(){
            return{
                settingItems : {system : 'sys', parameter: 'parameter', project : 'project', server : 'server'},
                activeSettingItem : '',
            }
        },
        methods : {
            goSetting(event){
                this.activeSettingItem = event.target.id;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../style/main";

    .x-basic{
        display: flex; flex-direction: row;
        @include width-height(100%, 100%);
        .x-basic-menu{
            @include margin-t-r-b-l(null, null, null, 1%);
            @include width-height(25%, 98%);
            overflow: auto;
            border: 1px solid rgba(255,255,255,0.3); border-radius: 5px;
            display: flex; flex-direction: row; flex-flow: row wrap;align-content: flex-start;
            background-color: white;
            .x-basic-menu-item{
                @include margin-t-r-b-l(1rem, null, null, 3%);
                @include width-height(45%, 5rem); line-height: 5rem;
                @include text-ellipse;
                font-size: 1.5rem; color: rgba(221,227,224,0.91);
                border: 1px solid rgba(15,200,227,0.91); border-radius: 5px;
                color: rgba(0,0,0,0.9);
            }
        }
        .x-basic-gap{@include width-height(1%, 100%);}
        .x-basic-content{
            @include margin-t-r-b-l(null, 1%, null, null);
            @include width-height(72%, 98%);
            overflow: auto;
            border: 1px solid white; border-radius: 5px;
            background-color: white;
        }
    }
</style>
