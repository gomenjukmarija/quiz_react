import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { connect } from 'react-redux';
import { register } from "../action/authenticateAction";
import store  from "../store/store";
import _  from "lodash";

export default class Register extends React.Component{

constructor(props) {
    super(props);
    this.state = { 
      name: '', email: '', password: '', password_confirmation: '', 
      telephone: '',  sex: '', date_of_birth: '' 
    }
    this.handleChangeUser = this.handleChangeUser.bind(this)   
    this.handleSubmit = this.handleSubmit.bind(this)   
}

handleChangeUser(event) { 
    let dynamicObject = this.state;
    dynamicObject[event.target.name] = event.target.value;    
    this.setState(dynamicObject);
}

handleSubmit(event) {
    event.preventDefault();    
    this.props.register(this.state)    
    this.setState(
      { 
        name: '', email: '', password: '', password_confirmation: '', 
        telephone: '',  sex: '', date_of_birth: '' 
      })    
}

render(){ 
   // console.log('мои пользователи:',this.props.user);       
return(
            <div className="container">
                <form className="form-horizontal"  method="POST" onSubmit={this.handleSubmit}>
                  <fieldset>

                    <div id="legend">
                      <legend className="">Регистрация</legend>
                    </div>
                  
                  <div className="control-group">
                     <label className="control-label"  for="name">Имя пользователя</label>
                     <div className="controls">
                        <input value={this.state.name} type="text"  name="name" placeholder="" className="input-xlarge" 
                        onChange={this.handleChangeUser} required  /> 
                     </div>
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
                        <input pattern=".{6,}" value={this.state.password} type="password"  name="password" className="input-xlarge" 
                        onChange={this.handleChangeUser} required title="6 characters minimum" /> 
                     </div>
                  </div>                   

                  <div className="control-group">
                     <label className="control-label" for="password_confirmation">Пароль (подтвердить)</label>
                     <div className="controls">
                        <input pattern=".{6,}" value={this.state.password_confirmation} type="password" name="password_confirmation" className="input-xlarge" 
                        onChange={this.handleChangeUser} required title="6 characters minimum" /> 
                     </div>
                  </div> 


                  <div className="control-group">
                     <label className="control-label"  for="telephone">Телефон</label>
                     <div className="controls">
                         <input value={this.state.telephone} type="text" name="telephone" placeholder="" className="input-xlarge" 
                         onChange={this.handleChangeUser} required /> 
                     </div>
                  </div> 

                  <div className="control-group">
                     <label className="control-label"  for="sex">Пол</label>
                     <div className="controls">
                          <input value="male" checked={this.state.sex === 'male'}  type="radio" name="sex"  
                          onChange={this.handleChangeUser} required /> М <br/>
                          <input value="female" checked={this.state.sex === 'female'} type="radio" name="sex"  
                          onChange={this.handleChangeUser} required /> Ж <br/> 
                     </div>
                  </div>

                  <div className="control-group">
                     <label className="control-label"  for="date_of_birth">Дата рождения</label>
                     <div className="controls">
                        <input value={this.state.date_of_birth} type="date" name="date_of_birth" placeholder="" className="input-xlarge" 
                        onChange={this.handleChangeUser} required /><br/> <br/>                          
                     </div>
                  </div>

                 <input type="submit" className="btn btn-success" value="Регистрация" />                                                      
                 </fieldset>
                </form>
            </div>
        );
}
}

function mapStateToProps (state) {
  return {   
    user: state.authenticateReducer, // 2) какой редюсер слушает наш экшен    
  }
}

function mapDispatchToProps(dispatch) {
  return {
        register: (user) => {
            dispatch(register(user)); //1)store.dispatch 
        },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)