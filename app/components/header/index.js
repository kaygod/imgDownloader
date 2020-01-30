import "./style.scss";

import React, { Component } from 'react';

export default class Header extends Component {

    static defaultProps={
        title:"公共头部",
        goBack:true,
        goSearch:false,
        login:false
    }
    
    goBack=()=>{
        this.props.history.goBack();
    }

    goSearchPage=()=>{
       this.props.history.push("/search");
    }

    login=()=>{
        this.props.history.push("/login");
    }

    render() {
        
        const {title,goBack,goSearch,login} = this.props;

        return (
            <div className="header">
                {
                    goBack?(<div className="back" onClick={this.goBack}>Back</div>):null
                }                
                 <div className="content">
                   {title}
                 </div>    
            </div>    
        );
    }
}