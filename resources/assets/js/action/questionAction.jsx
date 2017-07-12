import axios from "axios";

export function createQuestion(question, answer){
  return function (dispatch) {  	
    axios.post("http://localhost:8000/question/create", 
      { question: question, answer: answer } )          
      .then((response) => {	
      	//if response.config.alert //тогда js alert обычный
      dispatch({type: "CREATE_QUESTION", payload: response.config.data });              
    })
  }
}

export function getQuestion(){
  return function (dispatch) {    
    axios.get("http://localhost:8000/question/index" )          
      .then((response) => {    
      dispatch({type: "GET_QUESTION", payload: response.data });         
    })
  }
}

export function getAnswer(){
  return function (dispatch) {
    axios.get("http://localhost:8000/question/answers")          
      .then((response) => {
      dispatch({type: "GET_ANSWER", payload: response.data});         
    })
  }
}

export function getResult(){
  return function (dispatch) {
    axios.get("http://localhost:8000/result/index")          
      .then((response) => {
      dispatch({type: "GET_RESULT", payload: response.data});         
    })
  }
}

export function deleteUser(id){
  return function (dispatch) {
    axios.delete(`http://localhost:8000/question/delete/${id}`)
    .then((response) => {           
      dispatch(getQuestion());
    })
  }
}

export function createResult(result){
  return function (dispatch) {    
    axios.post("http://localhost:8000/result", 
      { result } )          
      .then((response) => { 
      dispatch({type: "CREATE_RESULT", payload: response.config.data });              
    })
  }
}

export function getData(id){
  return function (dispatch) {
    axios.get(`http://localhost:8000/result/data/${id}`)          
      .then((response) => {      
      dispatch({type: "GET_DATA", payload: response.data}); 
     // console.log('response', response.data);        
    })
  }
}