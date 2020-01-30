import {types,initialState} from "./action";
import {combineReducers} from "redux";

const likesReducer = (state = initialState.likes, action) => {
    switch (action.type) {
        case types["HOMEPAGE/LIKES_REQUESTTING"]:
            return {
                ...state,
                likesIsFetching:2
            };
        case types["HOMEPAGE/LIKES_REQUEST_FAIL"]:
           return {
               ...state,
               likesIsFetching:0
           };
        case types["HOMEPAGE/LIKES_REQUEST_SUCCESS"]:
            console.log(action);
           return {
            ...state,
            likesIsFetching:3,
            likes:action.response
         };
        default: return state;
    }
};

const recommendsReducer = (state = initialState.recoms, action) => {
    switch (action.type) {
        case types["HOMEPAGE/RECOM_REQUESTTING"]:
            return {
                ...state,
                recomIsFetching:2
            };
        case types["HOMEPAGE/RECOM_REQUEST_FAIL"]:
           return {
               ...state,
               recomIsFetching:0
           };
        case types["HOMEPAGE/RECOM_REQUEST_SUCCESS"]:
           return {
            ...state,
            recomIsFetching:3,
            recommends:action.response
         };
        default: return state;
    }
};

export default combineReducers({
    likes_name:likesReducer,
    recoms_name:recommendsReducer
})