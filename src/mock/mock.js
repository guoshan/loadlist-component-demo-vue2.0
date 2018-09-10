import Mock from 'mockjs';//引入mock模块

export default Mock.mock('/list', {//输出数据
    "orders|1-10":[{
        'name':'@name',
        'amount|1-100':80
    }],
    "totalSize|0-100":10,
    "limit|0-100":10,
    "startIndex|0-100":0
});
