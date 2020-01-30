import { dataResolve,createFolder } from "../../../utils/common";

let detail_url = createFolder({
  name:"detail_url.json",
  data:require("../../../constants/detail.json")
 });

export const initialState={
  isFetching:1,//0是访问失败 1是初始状态 2请求中 3请求成功
  data:{} 
}

export const getData = (store)=>{
    return store.detail.data;
}

export const getFlag = (store)=>{
   if(store.detail.isFetching==2){
      return true;
   }else{
      return false; 
   }
}

export const types={
    "DETAIL/REQUESTTING":"detail/requestting",
    "DETAIL/REQUEST_SUCCESS":"detail/request_success",
    "DETAIL/REQUEST_FAIL":"detail/request_fail"
}

export const actions={
  
  loadData(){

    return (dispatch,getState)=>{
       
      let params={
          url:detail_url,
          types:[types["DETAIL/REQUESTTING"],types["DETAIL/REQUEST_SUCCESS"],types["DETAIL/REQUEST_FAIL"]]
      }
      
      dispatch(dataResolve(params));

    }

  }

}