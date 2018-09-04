import Vue from 'vue';
import router from './router.js'
import app from './app.vue'


new Vue({
    el: '#app',
    router:router,
    render: h => h(app)//渲染组件内容为html
});

