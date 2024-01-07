const initalState = {
    jwt: "",
    user: "",      
};

const Reducer = (state = initalState, action: any) => {

    switch(action.type){
        case "SetJwt" : {
            return {...state, jwt: action.jwt};
        }
        case "GetJwt" : {
            return {...state};
        }
        case "SetUser" : {
            return {...state, user: action.user};
        }
        case "GetUser" : {
            return {...state};
        }                    
        default: return state;
    }
}

export default Reducer;
