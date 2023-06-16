import {produce} from 'immer';
const initialState ={
    user: null,
    socket: null
}

export const authReducer = (state= initialState, {type, payload})=>{
    return produce(state, (draft)=>{
        if(type === "LOGIN"){
            draft.user = {
                code: payload.code,
                username: payload.username
            };

            draft.socket= payload.socketObj;
        }
        if(type === "LOGOUT"){
            draft.user=null;
        }
        
        
    })
}