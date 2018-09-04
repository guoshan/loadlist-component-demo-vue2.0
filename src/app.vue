<template>
    <div class="app-main">
        <router-view>
            
        </router-view>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        updated(){
            console.log(history.state,'updated');
            this.$router.currentHistoryStateKey = history.state?history.state.key:0;
        },
    }
</script>