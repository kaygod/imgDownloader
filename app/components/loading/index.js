import React, { Component } from 'react';
import "./style.scss";
export default class Loading extends Component {

    static defaultProps={
       is_show:false
    }

    render() {
        const { is_show } = this.props;
        
        if(is_show){
         
         return (
            <div className="loading">
               <div className="child">加载中...</div> 
            </div>
         )   

        }else{
            return null;
        } 
        
    }

}