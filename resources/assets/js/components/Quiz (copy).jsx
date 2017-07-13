import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { connect } from 'react-redux';
import { getQuestion, getAnswer, createResult  } from "../action/questionAction";
import store  from "../store/store";
import _  from "lodash";
                           { ( flag === true   )   ?                                
                            <div>                        
                            <BarChart width={600} height={300} 
                            data={this.state.data}
                            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="answer"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="count_sex" stackId="a" fill="#8884d8" />
                            <Bar dataKey="male" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="count_bd" fill="#ffc658"/>
                            </BarChart>
                            </div>  
                            :  <div><img src='/uploads/loader.gif'/></div> } 

export default class Quiz extends React.Component{

  constructor(props) {
    super(props); 
    this.state = { 
    	component: []
    };       
    this.handleChangeResult = this.handleChangeResult.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {  	  	
    this.props.getQuestion();    
  }

  handleChangeResult(event, qId, aId) {     
    this.setState(
      {
        answer: event.target.value,
        question_id: qId, 
        answer_id: aId 
      })
  }

  handleClick(event, question) {
  	event.preventDefault();
    this.props.getAnswer();

    let component = this.state.component;
    let idInArray = _.findIndex(component, {'question_id': question.id});  
   	if (idInArray !== -1) {
   		component[idInArray].show = !component[idInArray].show;
   	} else {
   		let newQuestion = {
   			question_id : question.id,
   			show: true
   		}
   		component.push(newQuestion);
   	}
    this.setState(    
    	{component: component}     
    );    
  }

  handleSubmit(event, question) {
    event.preventDefault(); 
    this.props.createResult(this.state);
    
    let component = this.state.component;

    let idInArray = _.findIndex(component, {'question_id': question.id});
   	if (idInArray !== -1) {
   		component[idInArray].show = !component[idInArray].show;
   	} else {
   		let newQuestion = { 
   			question_id : question.id,
   			show: true
   		}
   		component.push(newQuestion);
   	}
    this.setState(    
    	{component: component}     
    );
  }

  render() { 
    let question = this.props.question.question;
    let answer = this.props.question.answer; 
      
    return (

					 <div className="panel-group" id="accordion">
					 		{ question.map((question, index) => {
					 		return (
					 			  	
					 			  	 <div className="panel panel-default">
					 			  	 		<div className="panel-heading">

					 			  	 			<h4 className="panel-title">
					 			  	 				<a key = {question.id} 
					 			  	 				onClick={(e) => this.handleClick(e, question)}
					 			  	 				id = {"question-" + question.id}>
					 			  	 					{question.question}
					 			  	 				</a>
					 			  	 			</h4>
					 			  	 		</div>					 		
					 			  	 		{  ( typeof this.state.component[index] !== 'undefined'  )  ? 					 			  	 		
						 			  	 		 (this.state.component[index].show  )  ? 					 			  	 		
						 			  	 			<div className="panel-body"  >						 			  	 										 			  	 				
						 			  	 				{  answer.map((answer, index) => {
						 			  	 					return (

						 			  	 						( answer.question_id === question.id  ) ?
						 			  	 						<span>
	                                    <input value={answer.answer} checked={this.state.answer === answer.answer} type="radio" 
	                                    id = {answer.id} onChange = {(e) => this.handleChangeResult(e, answer.question_id, answer.id)}
	                                     /> {answer.answer} <br/> 
						 			  	 						</span> 
						 			  	 						: <span></span>
						 			  	 					)     					       						
	      					            }) }
     					             
						 			  	 			</div>
						 			  	 		
						 			  	 		: <span></span> 
					 			  	 	 : <span></span>}
					 			  	 </div>					 			  	  
					 			  ) 			 		 	
					 			      
    		        })
    		        
 			        }
					 </div>		 		

    );
  }
 }




 
