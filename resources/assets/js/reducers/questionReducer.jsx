export default function question(state={
    question: [],
    response: [],
    result: [],
    answer: [],
    questionId: [],
    dataAnswer: [],
    flag: false,
    loading: false,  

}, action){

	switch (action.type) {		

    case "CREATE_QUESTION": {
			return  { 
				...state,
				response: action.payload
			};
    }

    case "GET_QUESTION": {    	
			return  { 
				...state,
				question: action.payload 
			};
    }

    case "PENDING_ANSWER": {   
    return  { 				 
    	...state,    	
    	flag: true,  				
    };
  }

    case "GET_ANSWER": {       	
			return  { 
				...state,
					answer: action.payload, 
			};
    }

    case "GET_RESULT": {       	
			return  { 
				...state,
					result: action.payload,
			};
    }

    case "CREATE_RESULT": {    	
			return  { 
				...state,
				response: action.payload 
			};
    }

    case "POST_ID": {    	
			return  { 
				...state,
				questionId: action.payload 
			};
    }

    case "PENDING_DATA": {  
    // console.log('action.payload', action.payload);       	
    return  { 				 
    	...state,    	
    	loading: true,  				
    };
  }

    case "GET_DATA": {  
    // console.log('action.payload', action.payload);       	
			return  { 				 
				...state,
				dataAnswer: action.payload,
				flag: true,  				
			};
    }

	}

	return state;

}
