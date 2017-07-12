import React from 'react';
﻿import axios from "axios";
import { connect } from 'react-redux';
import { getUser  } from "../action/userAction";
import store  from "../store/store";
import _  from "lodash";

export default class User extends React.Component{

 constructor(props) {
    super(props);   
  }

 componentDidMount(){
    this.props.getUser();
  }


  render() {
    let user = this.props.user.user; 
    return (
      <div className="container">    

          <div id="legend">
          
              <legend className=""><h1>Cписок пользователей</h1></legend>
                <ul>

                 {
                  user.map((user, index) => {
                    return (                                              
                        <li key = {user.id}>
                          <h3>{user.name}</h3>
                          <div>
                            <p><strong>Email: </strong> { user.email } </p>
                            <p><strong>Telephone: </strong> { user.telephone } </p>
                            <p><strong>Sex: </strong> { user.sex } </p>
                            <p><strong>Date OF Birth: </strong> { user.date_of_birth } </p>               
                           </div>
                        </li>  
                    )
                   
                 }) 
                }
                </ul>          
          </div>


      </div> 
    );
  }
} 


function mapStateToProps (state) {
  return {   
    user: state.userReducer, 
  }
}

function mapDispatchToProps(dispatch) {
  return {
        getUser: () => {
            dispatch(getUser());   //1)store.dispatch 
        },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)