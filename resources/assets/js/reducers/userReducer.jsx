export default function user(state={
    user: [],

}, action){

	switch (action.type) {

    case "GET_USER": {            
            return  {                
                ...state,
                user: action.payload                
            };
    }

	}

	return state;

}