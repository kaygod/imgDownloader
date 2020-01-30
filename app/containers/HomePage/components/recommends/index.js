import React, { Component } from 'react';
import "./style.scss";

export default class Recommends extends Component {
    
    static defaultProps={
        recommends:[]
     }

    render() {
        
        const { recommends } = this.props;

        return (
            <div className="recommends">
                <p className="head">今日推荐</p>
                {
                    recommends.map((item)=>(

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