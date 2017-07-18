export default function user(state={
    user: [],
    role: [],
    //admin: false,

}, action){

	switch (action.type) {

    case "CREATE_USER": {
			return  {
                ...state, 
                user: action.payload 
            };
    }

    case "CREATE_ADMIN": {
            return  {
             ...state,   
             user: action.payload,
            // admin: true            
            };
    }

    case "LOGIN_USER": {
			return  { 
                ...state,
                user: action.payload 
            };
    }

    case "LOGOUT_USER": {
			return  { 
                ...state,
                user: 'guest' 
            };
    }

    case "SESSION_USER": {
			return  { 
                ...state,
                user: action.payload 
            };
    }

    case "USER_ROLE": {
            return  { 
                ...state,
                role: action.payload 
            };
    }

	}

	return state;

}