import React from "react";
import { IndexLink, Link } from "react-router";
﻿import axios from "axios";
import { connect } from 'react-redux';
import { logout, getSession  } from "../action/authenticateAction";
import store  from "../store/store";
import { browserHistory } from 'react-router';

export default class Layout extends React.Component{

constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)    
}

componentWillMount() {
	this.props.getSession();
}

handleClick() {
    this.props.logout();    
}

render(){

	let authLinks;
	let clientLinks;	  

		if(this.props.user.user == 'guest')
		{			  
				authLinks = [
					{
						url: '/login',
						label: 'Войти'
					},
					{
						url: '/register',
						label: 'Регистрация'
					},
					{
						url: '/admin',
						label: 'Регистрация для админов'
					}
				]
		}
		else
		{			
			authLinks = [
					{
						url: '/logout',
						onсlick: this.handleClick, 
						label: 'Выход из системы'
					},
				]
		}

		if(localStorage.getItem('role') === 'client')
		{			  
				clientLinks = [
					{
						url: '/',
						label: 'Главная страница'
					}
				]
		}
		else
		{			
			clientLinks = [
					{
						url: '/',
						label: 'Главная страница'
					},
					{
						url: '/question',
						label: 'Админ панель'
					},
					{
						url: '/user',
						label: 'Пользователи'
					},
				]
		}

return(

      <div>			
      <nav className="navbar navbar-default" >
					<div className="collapse navbar-collapse" >
					<ul className="nav navbar-nav"> 

					{ 
						clientLinks.map((item, index) => {
							return (
								<li key={index}>
								   <Link to={item.url} onClick={item.onсlick}>{item.label}</Link>
								</li>
							)
						})
					}


					{ 
						authLinks.map((item, index) => {
							return (
								<li key={index}>
								   <Link to={item.url} onClick={item.onсlick}>{item.label}</Link>
								</li>
							)
						})
					}

					</ul> 
					</div>			
			</nav>
			<div className="container">
			{this.props.children}
			</div>
			</div> 
        );
    }
}

function mapStateToProps (state) {

  return {   
    user: state.authenticateReducer,// 2) какой редюсер слушает наш экшен  
  }
}

function mapDispatchToProps(dispatch) {
  return {
        logout: () => {
            dispatch(logout());   //1)store.dispatch 
        },
        getSession: () => {
            dispatch(getSession());   //1)store.dispatch 
        },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)