import axios from "axios";
import { browserHistory } from 'react-router';

export function register (user){
  return function (dispatch) {    
    axios.post("http://localhost:8000/auth/register", user)             
      .then((response) => {              
       dispatch({type: "CREATE_USER", payload: response.config.data })       
       if (response.data) {
          localStorage.setItem('myUser', response.config.data);
          browserHistory.push('/')
       }else {
            alert('Пользователь уже авторизирован!')
          }
        })
  }
}

export function registerAdmin (user){
  return function (dispatch) {    
    axios.post("http://localhost:8000/admin/register", user)             
      .then((response) => {              
       dispatch({type: "CREATE_ADMIN", payload: response.config.data })       
       if (response.data) {
          localStorage.setItem('myUser', response.config.data);
          browserHistory.push('/')
       }else {
            alert('Пользователь уже авторизирован!')
          }
        })
  }
}

export function login (user){
  return function (dispatch) {   	
    axios.post("http://localhost:8000/auth/login", user)             
      .then((response) => {  
       console.log(response);      
       dispatch({type: "LOGIN_USER", payload: JSON.parse(response.config.data) });
       if (response.data) { 
          let data = JSON.parse(response.config.data);         
          localStorage.setItem('myUser', data);
          localStorage.setItem('email', data.email);         
          browserHistory.push('/')
       }else {
            alert('Ошибка!')
          }
       }) 
  }
} 


export function role (){
  return function (dispatch) {    
    axios.get("http://localhost:8000/role/index")             
      .then((response) => {
       dispatch({type: "USER_ROLE", payload: response.data });
       }) 
  }
} 


export function logout (){
  return function (dispatch) {          
    axios.get("http://localhost:8000/auth/logout")       
      .then((response) => {    
       dispatch({type: "LOGOUT_USER"});
       if (response.data) { 
          localStorage.setItem('myUser', 'guest' );         
          browserHistory.push('login')
       }else {
            alert('Ошибка!')
          }
       }) 
  }
}

export function getSession (){
  return function (dispatch) {
      let userSession = localStorage.getItem('myUser');           
      dispatch({type: "SESSION_USER", payload: userSession});     
  }
}