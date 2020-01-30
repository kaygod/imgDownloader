import { initialState,types } from "./action";

export default (state=initialState,action)=>{
  
   switch(action.type){
      
      case types["DETAIL/REQUESTTING"]:
      return {...state,isFetching:2};

      case types["DETAIL/REQUEST_SUCCESS"]:
      return {...state,data:action.response,isFetching:3};

      case types["DETAIL/REQUEST_FAIL"]:
      return {...state,isFetching:0};

      default:
         return state;

   }

}