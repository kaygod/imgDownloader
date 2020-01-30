import React,{Component} from "react";
import "./style.scss";

const img_url = require("../../../../imgs/3.jpg");

export default class ProductDetail extends Component{

   
    render(){
        
        const { data,id } = this.props;

        return ( 

            <div className="productDetail">
               <p className="title">商品详情</p>
               <ul className="warpper">

                    <li className="item box">
                        <div className="prev">商品ID:</div>
                        <div className="after">{id}</div>
                    </li>
                    <li className="item box">
                        <div className="prev">商品名称:</div>
                        <div className="after">{data.name}</div>
                    </li>
                    <li className="item box">
                        <div className="prev">商品价格:</div>
                        <div className="after">{data.price}</div>
                    </li>
                    <li className="item box">
                        <div className="prev">商品图片:</div>
                        <div className="after">
                           {
                              data.img? <img src={img_url} />:null 
                           }                       
                        </div>
                    </li>
                    <li className="item box">
                        <div className="prev">商品数量:</div>
                        <div className="after">{data.count}</div>
                    </li>
                    <li className="item box">
                        <div className="prev">生产日期:</div>
                        <div className="after">{data.date}</div>
                    </li>
                    <li className="item box">
                        <div className="prev">商品描述:</div>
                        <div className="after">{data.desc}</div>
                    </li>
               </ul>
            </div>  

        )     
    }


}