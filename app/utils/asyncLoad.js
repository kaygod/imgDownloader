
import React,{Component} from "react";
export default function AsyncLoad(inComponent){
  
    class AsyncComponent extends Component{

        constructor(props){
          super(props);
          this.state={
              OutComponent:null
          }
        }
        
        componentDidMount(){
            inComponent().then((res)=>{
               this.setState({
                OutComponent:res.default
               })
            })
        }

        render(){

            const { OutComponent } =this.state;

            return (
                OutComponent ? <OutComponent {...this.props} />:null
            )

        }


    }

    return AsyncComponent;
 


}