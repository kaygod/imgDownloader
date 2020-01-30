import React, { Component } from 'react';
import "./style.scss";

export default class Likes extends Component {

    static defaultProps={
        likes:[]
     }
   
    render() {
        
        const {likes} =this.props;

        return (
            <div className="likes">
                <p className="head">猜你喜欢</p>
                {
                   likes.map((item)=>(
                    <div className="content" key={item.id} onClick={()=>{this.jump(item.id)}}>
                        <p>名称:<span className="space">{item.name}</span></p>
                        <p>描述:<span className="space">{item.desc}</span></p>
                    </div>
                   )) 
                }           
            </div>    
        );
    }

    jump=(id)=>{

       this.props.history.push(`/detail/${id}`);

    }

}