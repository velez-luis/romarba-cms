export const SetJwt = (token:any) =>{
    return {type:"SetJwt", jwt: token};
};

export const GetJwt = () =>{
    return {type:"GetJwt"};
};

export const SetUser = (usr:any) =>{
    return {type:"SetUser", user: usr};
};

export const GetUser = () =>{
    return {type:"GetUser"};
};