import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { connect } from 'react-redux';
import { createQuestion, getQuestion, deleteUser, getData  } from "../action/questionAction"; 
import store  from "../store/store";
import _  from "lodash";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     question: '',
     inputs: [{id: 0}],        
     answer: [],
     showModal: false,    
     };
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.handleBtnDelete = this.handleBtnDelete.bind(this); 
    this.close = this.close.bind(this); 
    this.open = this.open.bind(this);     
  }

  componentDidMount(){
    this.props.getQuestion();
  }

  handleChangeQuestion(event) {    
    this.setState({question: event.target.value}); 
  }

  handleChangeAnswer(event, id) {   
    var arr = this.state.answer;
    var newInput = {id: id, answers: event.target.value};      
    if (newInput.answers !== '') {      
      arr.push(newInput);      
    }
    var arrId = _.findIndex(arr, {'id': newInput.id});    

    if (arrId !== -1 ) {
      _.remove(arr, function(arr){
          return arr.id == arrId
      })
      arr.push(newInput);
    } 
    
    var answer  = _.uniq(arr);
    console.log('answer', answer); 
    this.setState({answer: answer});     
  }

  handleSubmit(event) {
    event.preventDefault();      
    this.props.createQuestion(this.state.question, this.state.answer);
    this.props.getQuestion();
    this.setState({question: '', inputs: [], answer: [] })
  }

  appendInput(event) { 
      event.preventDefault();
     // console.log('event',event); 
      let inputs = this.state.inputs
      if(inputs.length < 8){
        inputs.push({id: inputs.length})
        this.setState({inputs: inputs})        
    //    console.log('inputs', this.state.inputs);
      } 
  }

  removeInput(id) { 

      let inputs = this.state.inputs
      let answer = this.state.answer

      _.remove(inputs, function(input){
          return input.id == id
      })

      _.remove(answer, function(an){
          return an.id == id
      })

      this.setState({inputs: inputs, answer: answer})         
  }

  handleBtnDelete(id, event){
    event.preventDefault();
    var r = confirm("Are you sure you want to delete this document!");
      if (r == true) {          
        this.props.deleteUser(id);
      }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(id) {

    this.props.getData(id);
    this.setState({ showModal: true }); 
  }

  render() { 
    let question = this.props.question.question; 
    let flag = this.props.question.loading;
   // console.log('this.props.question.dataAnswer',this.props.question.dataAnswer);

    return (
      <div className="container"> 

        <form>
          
          <div className="form-group col-md-5 input_fields_wrap">

            <label>Вопросы:</label>            
            <input type="text" className="form-control" 
            value={this.state.question} onChange={this.handleChangeQuestion} required/><br/>           

            <button className="btn btn-default" onClick={this.appendInput}>
                Добавить вариант ответа
            </button><br/><br/>            

            <div id="dynamicInput">                             
               {this.state.inputs.map((input, index) => {
                  return (
                    <div className="form-group" key={input.id}>
                      <label>Ответ-{index + 1}</label>
                      <div className="row">      
                        <div className="col-md-8">
                          <input type="text" className="form-control" 
                           defaultValue = {input.answers} onBlur= {(e) => this.handleChangeAnswer(e, input.id)}                  
                           required/>
                        </div>                    
                        <div className="col-md-4">
                          <span style={{marginTop: "8px", fontSize:"20px", cursor: "pointer"}} 
                          className="glyphicon glyphicon-remove" onClick={ () => this.removeInput(input.id)}>
                          </span>
                        </div>
                      </div>
                    </div> 
                  )    
                })}             
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}> 
                Добавить опрос
            </button><br/><br/> 
          </div>  

          
          <div id="legend">          
              <legend className=""></legend>
                <ul>
                 {
                  question.map((question, index) => {
                    

                    return (
                        <div>                                              
                        <li key = {question.id}>
                          <h3>{question.question}</h3>                            
                            <a className="btn btn-danger btn-xs" onClick={(event) => this.handleBtnDelete(question.id, event)} 
                            href="#" id={question.id}><i className="glyphicon glyphicon-trash"></i></a>
                        </li> <br/>  
                       
                        <Button
                        bsStyle="info"                               
                        onClick= {                          
                          () => this.open(question.id)
                        }                           
                        >
                        Результаты
                        </Button>
                        <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> 
                        { ( flag === true   )   ?                
                            <div>                                             
                              <BarChart 
                                width={600} 
                                height={300} 
                                data={this.props.question.dataAnswer}
                                margin={{top: 20, right: 30, left: 20, bottom: 5}}
                              >
                                <XAxis dataKey="answer"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                  <Bar dataKey="female" stackId="a" fill="#8884d8" />
                                  <Bar dataKey="male" stackId="a" fill="#82ca9d" />                               
                                  <Bar dataKey="count_bd" fill="#ffc658"/>
                              </BarChart>                              
                            </div> 
                            :  <div></div> }
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                        </Modal>
                        </div>  
                    )
                   
                 }) 
                }
                </ul>          
          </div>

        </form>  

      </div> 
    );
  }
} 


function mapStateToProps (state) {
  return {   
    question: state.questionReducer, // 2) какой редюсер слушает наш экшен <h2>{this.props.question}</h2><br/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
        createQuestion: (question, answer) => {
            dispatch(createQuestion(question, answer)); //1)store.dispatch 
        },
        getQuestion: () => {
            dispatch(getQuestion());   
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id));   
        },
        getData:(id) => {
            dispatch(getData(id));  
        },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)


