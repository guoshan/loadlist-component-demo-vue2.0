var Common = {
    extends:function(){//对象融合
        if(arguments.length>1){
            var returnArg = arguments[0];
            for(var i=1;i<arguments.length;i++){
                //var _type = typeof arguments[i];
                //if(_type=='object'&&!arguments[i] instanceof Array){
                for(var key in arguments[i]){
                    var _type = typeof arguments[i][key];
                    if(_type=='object'&&!(arguments[i][key] instanceof Array)){
                        //Common.extends(returnArg[key]||{},arguments[i][key]);
                        if(returnArg[key]){
                            Common.extends(returnArg[key],arguments[i][key]);
                        }else{
                            returnArg[key] = arguments[i][key];
                        }
                    }else{
                        returnArg[key] = arguments[i][key];
                    }
                }
            }
            return returnArg;
        }
    }
}
export default Common;