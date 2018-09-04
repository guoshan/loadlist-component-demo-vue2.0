import Vue from 'vue';
import VueRouter from 'vue-router'

import list from './views/list.vue'
import detail from './views/detail.vue'

Vue.use(VueRouter);

const routes = [
    {path:'/index',component:list,meta:{title:'加载列表'}},
    {path:'/detail',component:detail,meta:{title:'详情页'}}
]
const router = new VueRouter({
    routes:routes,
    mode: 'history',
});
router.beforeEach((to,from,next)=>{
    document.title = to.meta.title;
    next();
});
export default router
