import axios from "axios";

export function getUser(){
  return function (dispatch) {    
    axios.get("http://localhost:8000/user/index" )          
      .then((response) => { 
     // console.log('user',response.data);       
      dispatch({type: "GET_USER", payload: response.data });         
    })
  }
}

