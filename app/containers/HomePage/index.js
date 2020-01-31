import React, { Component } from 'react';
import Loading from "../../components/loading";
import "./style.scss";
const request = require('request');
const remote = require('electron').remote;
const dialog = remote.dialog;
const progress = require('request-progress');
const fs = require("fs");
const path = require("path");
const URL = require('url');


export default class Homepage extends Component {


  constructor(props){
      super(props);
      this.state = {
        url:"", //https://m.wayforcloud.com/wx/build/static/media/
        dirPath:"",
        status:1, // 1 未下载 2 下载中
        current_num:0,
        total:0 
      }
  }

  /**
   * 保存文件的路径
   */
  save = ()=>{

    var options = {};
    options.title = '选择目录';
    //  createDirectory仅用于Mac OS 系统
    options.properties = ['openDirectory','createDirectory'];
    this.setState({
      dirPath:dialog.showOpenDialog(options)[0]
    })

  }

  warn = (msg,title="警告")=>{

    let options = {};
    options.title = title;
    options.message = msg;
   // 设置对话框类型
    options.type = 'warning';
    dialog.showMessageBox(options)

  }

  /**
   * 获取所有图片的下载路径
   */
  getFiles = (url)=>{

    return new Promise((resolve)=>{

      request(url,(error, response, body)=>{
        if(error){
          resolve([]);
          return false;
        }

        let reg = /<a.+?href=(['"])([^'"]+?\.(png|jpg|jpeg|PNG|JPG))\1[^>]*>/ig;

        let obj,arr = [];
        
        while((obj = reg.exec(body)) !== null){
          if(!arr.includes(obj[2])){
            arr.push(obj[2]);
          } 
        }

        //这正则写的不对
        reg = /<img.+?src=(['"])([^'"]+?\.(png|jpg|jpeg|PNG|JPG))\1[^>]*>/ig;
        while((obj = reg.exec(body)) !== null){
          if(!arr.includes(obj[2])){
            arr.push(obj[2]);
          } 
        }

        resolve(arr);
        
      })

    })

  }

  /**
   * 获取文件下载路径
   */
  getFileUrl = (v,url)=>{

    let fileUrl;

    if(v.includes("http://") || v.includes("https://")){
      fileUrl = v;
    }else if(url.endsWith("/")){
      fileUrl = `${url}${v}`;
    }else{
      fileUrl = `${url}/${v}`;
    }
    return fileUrl;

  }

  /**
   * 真的开始要下载了
   */
  downLoadHandler = (arr)=>{

    const { dirPath,status,current_num,total,url } = this.state;

      this.setState({
        current_num:0,
        total:arr.length
      })
      
      arr.forEach((v)=>{

        const fileName = path.basename(v);

        if(v.startsWith("/")){
           v = v.substring(1, v.length);  
        }

        let fileUrl = this.getFileUrl(v,url);
      
        request(fileUrl,(error, response)=>{

           if((response && response.statusCode == 404) || error){
              const {protocol,host} = URL.parse(url);
              fileUrl = this.getFileUrl(v,`${protocol}//${host}`);
           }

           this.progressHandler(fileUrl,dirPath,fileName,arr);
           
        })

      })
}
  /**
   * 插件开始了
   */
  progressHandler = (fileUrl,dirPath,fileName,arr)=>{

    progress(request(fileUrl),{})
    .on('error',(err)=>{
        console.log(err);
        this.completeHandler(arr);
    })
    .on('end',()=>{
       this.completeHandler(arr);
    })
    .pipe(fs.createWriteStream(`${dirPath}/${fileName}`));
    
  }

/**
 * 下载完毕处理
 */
 completeHandler = (arr)=>{


  this.setState({
    current_num:this.state.current_num+1
  },()=>{
     if(this.state.current_num>=arr.length){

        this.setState({
          status:1, // 1 未下载 2 下载中
          current_num:0,
          total:0 
        },()=>{

          let timer = setTimeout(()=>{
            clearTimeout(timer);
            this.warn("下载完毕!","提示");
          },50)

        })

     }
  })

 }

  /**
   * 开始下载
   */
  downLoad = async ()=>{

    const { dirPath,url,status } = this.state;

    if(status == 2){//正在下载
      return false;
    }

    let new_url = url;

    if(new_url.trim() === ""){
      this.warn("请填写下载路径");
      return false;
    }

    if(dirPath.trim() === ""){
      this.warn("请选择保存路径");
      return false;
    }

    if(!(new_url.includes("http://") || new_url.includes("https://"))){
      new_url = `http://${new_url}`;
    }

    /**
     * 下面的getFiles执行可能需要花费很长事件,所以这里改成下载中状态
     */
    this.setState({
      status:2
    })

    const urls = await this.getFiles(new_url);

    if(urls.length == 0){
      this.setState({
        status:1
      },()=>{
        this.warn("没有发现图片!");
      })
      return false;
    }

    this.downLoadHandler(urls);

  }
  
  render() {

    const { dirPath,url,status,current_num,total } = this.state;

    return (
      <div className="home">

        <div className="box wrapper">
             <p className="lt">下载路径:</p>
             <p className="gt"><input url={url} onChange={(e)=>{this.setState({url:e.currentTarget.value})}} type="text" className="input"/></p> 
        </div>

        <div className="box wrapper save-path">
          <p className="lt"><button className="save" onClick={this.save}>保存</button></p>
          <p className="lt dir" title={dirPath}>{dirPath}</p> 
        </div>

        {
          status == 2?(
            <div className="box wrapper">
              <p className="lt"><progress value={current_num} max={total}></progress></p>
              <p className="gt">{current_num}/{total}</p>
            </div>
          ):null
        }
      
        <div className="box wrapper">
          <p className={`lt download ${status==2?"gray":""}`} onClick={this.downLoad}>{status == 1?"下载":"下载中"}</p>
        </div>

      </div>
    )
  }

 


}

