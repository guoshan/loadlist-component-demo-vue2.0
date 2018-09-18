
<template>
    <div class="common-list" @scroll.capture="scrolling">
        <slot name="list-top"></slot>
        <div :class="config.wraperClass">
            <slot name="item-bd" :item="item" :index="index" v-for="(item,index) in list"></slot>
        </div>
        <div class="weui-loadmore">
            <i class="weui-loading" v-if="!config.loadAll"></i>
            <span class="weui-loadmore__tips">{{config.loadAll?config.loadedTxt:"正在加载"}}</span>
        </div>
    </div>
</template>
<script>
    import vue from 'vue';
    import common from '../js/common';
    export default{
        data(){
            return {
                config:{
                    params:{offset:0,limit:10},
                    api:{},
                    loading:false,
                    loadAll:false,
                    wraperClass:'',
                    listKey:'',

                    emptyTips:'加载完毕'
                },
                list:[],
            }
        },
        methods:{
            init:function(cfg){
                common.extends(this.config,cfg);
                this.loadList();
            },
            resetConfig(cfg){
                if(cfg){
                    common.extends(this.config,cfg);
                }
                this.config.params[this.config.api.searchKey] = this.searchVal;
                this.config.loadAll = false;
                this.config.loading = false;
                this.config.params.offset = 0;
                this.list = [];
                this.loadList();
            },
            loadList(){
                this.config.loading = true;
                this.config.api(this.config.params).then((data)=>{
                    if(this.config.params.offset==0){
                        this.list = data[this.config.listKey];
                    }else{
                        this.list = this.list.concat(data[this.config.listKey]);
                    }
                    this.config.loading = false;
                    this.$nextTick().then(()=>{
                        var cell = this.$el.querySelector('.weui-cell');
                        if(!cell)return;
                        var btns = cell.querySelectorAll('.weui-swiped-btn');
                        if(btns.length>0){
                            this.maxSwipeWidth = btns[0].clientWidth*btns.length;
                        }
                    });
                    if(data.startIndex+data.limit>data.totalSize){
                        this.config.loadAll = true;
                    }
                    //数据有问题的时候会出现这种情况
                    if(data[this.config.listKey].length==0){
                        this.config.loadAll = true;
                    }
                    if(this.config.success)this.config.success();
                })
            },
            scrolling:function(e){
                if(this.config.loading||this.config.loadAll){
                    return;
                }
                if(this.$el.scrollTop+this.$el.offsetHeight>=this.$el.scrollHeight-50){
                    this.config.params.offset+=this.config.params.limit;
                    this.loadList();
                }
                e.preventDefault();
            }
        }
}
</script>
