import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { connect } from 'react-redux';
import { login,  role } from "../action/authenticateAction";
import { getUser  } from "../action/userAction";
import store  from "../store/store";
import _  from "lodash";

export default class Login extends React.Component{

constructor(props) {
    super(props);
    this.state = { 
      email: '', password: '', role: ''
    }
    this.handleChangeUser = this.handleChangeUser.bind(this)   
    this.handleSubmit = this.handleSubmit.bind(this)   
}

 componentDidMount(){
    this.props.getUser();
    this.props.role();
  }


handleChangeUser(event) { 
    let dynamicObject = this.state;
    dynamicObject[event.target.name] = event.target.value;    
    this.setState(dynamicObject);
}

handleSubmit(event) {
    event.preventDefault(); 
    
    
    // let user = this.props.user;
    // console.log('user', user);
    
    // let email = this.state.email; 
    // console.log('userInArray', userInArray);
    // let userInArray = _.find(user, {email});
    
    // console.log('role', this.props.user.role);


    this.props.login(this.state);


    this.setState(
      { 
        email: '', password: '', role: ''
      })    
}

render(){
return(
            <div className="container">
                <form className="form-horizontal"  method="POST" onSubmit={this.handleSubmit}>
                  <fieldset>

                    <div id="legend">
                      <legend className="">Логин</legend>
                    </div>

                  <div className="control-group">
                     <label className="control-label" for="email">E-mail</label>
                     <div className="controls">
                        <input value={this.state.email}  type="email" name="email"  className="input-xlarge" 
                         onChange={this.handleChangeUser} required /> 
                     </div>
                  </div>  

                  <div className="control-group">
                     <label className="control-label" for="password">Пароль</label>
                     <div className="controls">
                        <input value={this.state.password} type="password"  name="password" className="input-xlarge" 
                         onChange={this.handleChangeUser} required /> 
                     </div>
                  </div> 

                  <div>
                  	<input type="checkbox" name="remember" /> Запомни меня
                  </div><br/>

                   <input type="submit" className="btn btn-success" value="Логин" />                                                      
                 </fieldset>
                </form>
            </div>
);
}
}

function mapStateToProps (state) {
  return {   
    user: state.userReducer, // 2) какой редюсер слушает наш экшен  
  }
}

function mapDispatchToProps(dispatch) {
  return {
        login: (user) => {
            dispatch(login(user)); //1)store.dispatch 
        },
        getUser: () => {
            dispatch(getUser());   //1)store.dispatch 
        },
        role: () => {
            dispatch(role());   //1)store.dispatch 
        },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)