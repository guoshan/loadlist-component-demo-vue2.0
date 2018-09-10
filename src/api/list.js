import axios from 'axios';
export default{
    getList(){
        return new Promise((resolve,reject)=>{
            axios.get('/list').then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                reject();
            });
        });
    }
}
