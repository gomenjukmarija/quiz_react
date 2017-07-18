import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { connect } from 'react-redux';
import { getQuestion, getAnswer, createResult, getResult } from "../action/questionAction";
import { getUser  } from "../action/userAction";

import store  from "../store/store";
import Quiz   from "./Quiz";


export default class Home extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {     	
    };
  }

  componentDidMount() {  	  	
    this.props.getQuestion();
    this.props.getResult(); 
  }


render(){

	let questions = this.props.question.question;
	let answers = this.props.question.answer;
	let flag = this.props.question.flag;
  let result = this.props.question.result;

  return(
            <div className="container">
            <legend className=""><h1>Список опросов</h1></legend>
            	<div>
            	{
            		questions.map((q, index) => {
            			return ( <Quiz 
            				       question={q} key={index} createResult={this.props.createResult}
            				       getAnswer={this.props.getAnswer} answer={answers} flag={flag} 
                           getResult={this.props.getResult} result={result}
                           /> )
            		})               
            	} 
            	</div>
            </div>
        );
   }
}

function mapStateToProps (state) {
  return {   
    question: state.questionReducer,
    user: state.userReducer,  
  }
}

function mapDispatchToProps(dispatch) {
  return {
        getQuestion: () => {
            dispatch(getQuestion());    
        },
        getAnswer: () => {
            dispatch(getAnswer());    
        },
        createResult: (result) => {
            dispatch(createResult(result));    
        },
        getResult: () => {
            dispatch(getResult());    
        },
        getUser: () => {
            dispatch(getUser());    
        },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)