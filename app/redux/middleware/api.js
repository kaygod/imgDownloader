

import {get} from "../../utils/common";

export default store => next => action=>{
    
   if(!action.type.isFetching){ //直接放行
     
     return next(action);

   }

   const {url,types} = action.type.isFetching;

   if(!url){
      throw new Error("url为必须要传递的项");
      return false;
   }

   if(types.length!=3){
     throw new Error("请求状态请穿三个来");
     return false;
   }

   const [requesting,success,fail] = types;
    
    next(requesting);

    let timer=setTimeout(() => {
      
      clearTimeout(timer);

      get({url:url}).then((res)=>{

        return next(operate(success,res));

      }).catch(()=>{

          next(fail);

      })

    }, 500);

}

const operate=(successType,res)=>{  //只要是通过这个中间件的就一定带有response属性
   
    successType.response=res;

    return successType;

}