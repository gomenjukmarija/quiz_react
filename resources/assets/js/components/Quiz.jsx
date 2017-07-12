import React from 'react';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

export default class Quiz extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
    	open: false,
      answer: '',
      question_id: '',  	
    };
    this.handleChangeResult = this.handleChangeResult.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this); 
  }

  handleClick() {
    this.props.getResult();
    this.props.getUser(); 
    setTimeout(this.props.getAnswer, 2000);
    this.props.flag = false;
    this.setState({ open: !this.state.open,  answer: ''});
  }

  handleChangeResult(event, qId, aId) {
        this.setState(
        {
          answer: event.target.value,
          question_id: qId, 
          answer_id: aId 
        })
  }

  handleSubmit(event) {
    event.preventDefault();    

    if (this.state.answer !== '') {
       alertify.set('notifier','position', 'top-right');

       let result = this.props.result;
       let question_id = this.state.question_id;
       let idInArray = _.findIndex(result, {'question_id': question_id});
        
       let user = this.props.user;
       let email = localStorage.getItem('email');
       let userInArray = _.find(user, {email}); 
       let userId = _.findIndex(result, {'user_id': userInArray.id}); 

       if (idInArray !== -1 &&  userId !== -1  ) {
          alertify.set('notifier','position', 'top-right');
          alertify.warning('Вы уже голосовали!', 3);
       } else { 
          alertify.notify('Спасибо за ваш голос!', 'success', 3);
          this.props.createResult(this.state);
         } 
       setTimeout(function() { this.setState({ open: !this.state.open, answer: '' }); 
       }.bind(this), 3000);
    } else {
       alertify.set('notifier','position', 'top-right');
       alertify.warning('Выберите ответ, пожалуйста', 3);        
    }

    this.setState(
      {
        answer: '', question_id: '',
      })
  }

  render() {

   
    let question = this.props.question;
    let answer = this.props.answer; 
    let flag = this.props.flag;

    return (

    		<div>
    		   <Button onClick={ ()=> this.handleClick()}>
                {question.question}
           </Button>
    			<Panel collapsible expanded={this.state.open}>    			         
						 	{  
                ( flag === true   )  ? 
						 		answer.map((answer, index) => {
						 			  	return (
						 			  		( answer.question_id === question.id  ) ?
						 			  		<span>						 			  		
						 			  			<input value={answer.answer} checked={this.state.answer === answer.answer} type="radio" 
						 			  			id = {answer.id} onChange = {(e) => this.handleChangeResult(e, answer.question_id, answer.id)}/>
						 			  			{answer.answer}<br/>
						 			  		</span> 
						 			  		: <span></span>
						 			  		)						 			  	
						 	}) :  <div><img src='/uploads/loader.gif'/></div> } 
						   <Button bsStyle="success" onClick={(e) => this.handleSubmit(e)}>
                Сохранить
              </Button>
    			</Panel>
    		</div>

    );
  }
 }

