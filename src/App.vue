<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>

<style lang="scss">
    @import "style/main";
    html, body{
        @include margin-tb-rl(0, 0);
        @include padding-tb-rl(0, 0);
        @include width-height(100%, 100%);
        color: rgba(204,255,232,0.85)!important;
    }
    #app {
        display: flex;
        flex-direction: column;
        @include margin-tb-rl(0, 0);
        @include padding-tb-rl(0, 0);
        @include width-height(100%, 100%);
        font-family: Calibri;
        text-align: center;
        font-size: 16px;
        background: url("assets/bg.jpg");
       background-size: 100% 100%;
    }
</style>
