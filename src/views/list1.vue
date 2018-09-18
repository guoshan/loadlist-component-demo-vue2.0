<template>
    <div class="page">
        <div class="page-content">
            <listComponent ref="order_list" class="order_list">
                <div slot="list-top">
                    <div class="_weui-btn-group">
                        <div @click="btn_item_click($event,2)" class="item selected">tab3</div>
                        <div @click="btn_item_click($event,10)" class="item">tab4</div>
                    </div>
                </div>
                <div slot="item-bd" slot-scope="props">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                    {{props.item.name}}                
                            </div>
                            <div class="weui-cell__ft">{{props.item.amount}}</div>
                        </div>
                    </div>
                </div>
            </listComponent>
        </div>
    </div>
</template>
    <style scoped>
        ._weui-btn-group{display: flex;}
        ._weui-btn-group .item{
            width:50%;text-align:center;
            line-height:30px;
            border:1px solid #2ABE47;
            color:#2ABE47;
        }
        ._weui-btn-group .item.selected{background-color:#2ABE47;color:#fff;}
        ._weui-btn-group .item:first-child{border-radius:4px 0 0 4px}
        ._weui-btn-group .item:last-child{border-radius:0 4px 4px 0}
        ._weui-btn-group{width:80%;margin:22px auto;}
        ._weui-btn-group .item.waiting{
            border: 1px solid rgba(42, 190, 71, 0.5);
            color: rgba(42, 190, 71, 0.5);
        }
    </style>
    <script>
        import listComponent from '../components/com_list.vue'
        import listApi from '../api/list'
        import listData from '../mock/mock.js'
        export default{
            data(){
                return {
                    sourceType:'2',
                }
            },
            components:{
                listComponent
            },
            methods:{
                btn_item_click(e,sourceType){
                    if(e.currentTarget.parentNode.className.indexOf('waiting')==-1){
                        e.currentTarget.parentNode.className = '_weui-btn-group waiting';
                        e.currentTarget.parentNode.querySelector('.selected').className = 'item';
                        e.currentTarget.className = 'item selected';

                        this.sourceType = sourceType;
                        this.$refs.order_list.resetConfig({
                            params:{sourceType:sourceType}
                        });
                    }
                }
            },
        
            mounted() {
                this.$refs.order_list.init({
                    api:listApi.getList,
                    listKey:'orders',
                    params:{
                        orderType:'0',
                        orderStatus:'0',
                        sourceType:'2'
                    },
                    emptyTips:'您还没有任何订单哦',
                    success:()=>{
                        this.$el.querySelector('._weui-btn-group').className = '_weui-btn-group';
                    }
                })
                console.log(listData)

            }
    }
    </script>
    