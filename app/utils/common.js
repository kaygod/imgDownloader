import axios from 'axios';

const fs = require("fs");

const path = require("path");

const { remote } = require('electron');

export const get = (parmas)=>{

   return new Promise((resolve,reject)=>{

        axios.get(parmas.url)
        .then((res)=>{
           if(typeof res == "string"){
              res=JSON.parse(res);
           }
           resolve(res.data);
        })
        .catch((error)=>{
          reject();
        })

   })  

}

export const dataResolve=(params)=>{ 
  return {
    type:{
      isFetching:{
          url:params.url,
          types:transformObject(params.types)
      }
    }
  }
}

const transformObject=(params)=>{
  return params.map((v)=>{
    return {
        type:v
    }
  })
}

export const createFolder=(data)=>{

  let exePath = path.dirname(remote.app.getPath('exe'));

  let dirName = path.join(exePath,"/public");

  let fileName = path.join(exePath,`/public/${data.name}`);

  if(fs.existsSync(dirName)){
     
    if(fs.existsSync(fileName)){
        return fileName;
    }else{

      fs.writeFileSync(fileName,JSON.stringify(data.data));

      return fileName;
        
    }

  }else{

    fs.mkdirSync(dirName,'0777');

    fs.writeFileSync(fileName,JSON.stringify(data.data));

    return fileName;

  }
 
}