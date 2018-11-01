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
        @include padding-tb-rl(2px, 2px);
        @include width-height(calc(100% - 4px), calc(100% - 4px));
    }
    #app {
        @include width-height(100%, 100%);
        background: url("assets/bg.jpg");
        background-size: 100% 100%;
        overflow: auto;
        font-family: Calibri;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        box-shadow: 0 0 5rem 0 rgba(248,210,69,0.91);
    }
</style>
